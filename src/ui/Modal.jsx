import styled from "styled-components";
import { HiX } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DeleveryCharge, GSTperItem } from "../constant";
import toast from "react-hot-toast";
import { BaseUrl } from "../helper";

const StyledButton = styled.button`
  font-size: 1.5rem;
  height: 3rem;
  width: 10rem;
  margin: 10px;
  background-color: black;
  color: white;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledModalBackground = styled.div`
  background: rgba(0, 0, 0.7, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  overflow: scroll;
`;

const StyledBox = styled.div`
  background-color: #5c094e;
  height: auto;
  width: 45rem;
  padding: 10px;
  margin-top: 5rem;
  margin-bottom: 0.5rem;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 90%;
    margin-top: 5rem;
    margin-bottom: 1rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`;

const StyledInput = styled.input`
  height: 3rem;
  width: 25rem;
  margin: 7px;
  background-color: #cfa2c7;
  box-shadow: black;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLabel = styled.label`
  font-size: 1.5rem;
  color: white;
`;
const StyledDetail = styled.div`
  color: white;
  font-size: 1.5rem;
  margin-right: 9rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  @media (max-width: 768px) {
    margin-right: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;
const StyledDetailcontent = styled.div`
  padding: 0.5rem;
`;
const StyledCheckbox = styled.input`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 25px;

  border-radius: 3px;
  margin-right: 5px;
`;
function Modal({ setIsModalOpen }) {
  const modalBackgroundRef = useRef(null);
  const [isChecked, setisChecked] = useState(false);
  const [costomerName, setCostomerName] = useState("");
  const [costomerEmail, setCostomerEmail] = useState("");
  const [costomerNumber, setCostomerNumber] = useState("");
  const [costomerAddress, setCostomerAddress] = useState("");

  const quantity = useSelector((store) => store.cartslice.Qty);
  const price = useSelector((store) => store.cartslice.totalprice);
  const cartitem = useSelector((store) => store.cartslice.cartItem);
  const userId = useSelector((store) => store.loginslice.userId);
  const GST = GSTperItem * quantity;
  const totalPrice = price + GST + DeleveryCharge;

  function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${random}`;
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalBackgroundRef.current &&
        event.target === modalBackgroundRef.current
      ) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsModalOpen]);
  async function handelSubmit(e) {
    e.preventDefault();
    const OrderedOn = new Date();
    const orderNumber = generateOrderNumber();
    const order = {
      costomerName: costomerName,
      costomerEmail: costomerEmail,
      costomerNumber: costomerNumber,
      costomerAddress: costomerAddress,
      totalPrice: totalPrice,
      totalquantity: quantity,
      orderNumber: orderNumber,
      cartitem: cartitem,
      OrderedOn: OrderedOn,
      userId: userId,
    };

    try {
      const response = await fetch(`${BaseUrl}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        toast.success("Order submitted successfully!💃");
        setCostomerName("");
        setCostomerEmail("");
        setCostomerNumber("");
        setCostomerAddress("");
        setIsModalOpen(false);
      } else {
        console.error("Failed to submit the order");
      }
    } catch (error) {
      console.error("Error in submitting the order:", error);
      toast.error("Error during ordering");
    }
  }
  return (
    <StyledModalBackground ref={modalBackgroundRef}>
      <StyledBox>
        <div
          style={{ display: "flex", justifyContent: "end", fontSize: "30px" }}
          onClick={() => setIsModalOpen(false)}
        >
          <HiX />
        </div>
        <StyledForm onSubmit={handelSubmit}>
          <StyledLabel>Name</StyledLabel>
          <StyledInput
            placeholder="Name"
            value={costomerName}
            onChange={(e) => setCostomerName(e.target.value)}
            required="this field is required"
          />
          <StyledLabel>Email</StyledLabel>
          <StyledInput
            placeholder="Email"
            value={costomerEmail}
            onChange={(e) => setCostomerEmail(e.target.value)}
            required="this field is required"
          />
          <StyledLabel>Contact No</StyledLabel>
          <StyledInput
            placeholder="Contact Number"
            value={costomerNumber}
            onChange={(e) => setCostomerNumber(e.target.value)}
            required="this field is required"
          />
          <StyledLabel>Delivery Address</StyledLabel>
          <StyledInput
            placeholder="Address"
            value={costomerAddress}
            onChange={(e) => setCostomerAddress(e.target.value)}
            required="this field is required"
          />
          <StyledDetail>
            <StyledDetailcontent>Quantity : {quantity}</StyledDetailcontent>
            <StyledDetailcontent>Price : Rs.{price}/-</StyledDetailcontent>
            <StyledDetailcontent>GST : Rs.{GST}/-</StyledDetailcontent>
            <StyledDetailcontent>
              Delevery charge : Rs.{DeleveryCharge}/-
            </StyledDetailcontent>
            <StyledDetailcontent>
              Total Price : Rs.{totalPrice}/-
            </StyledDetailcontent>
            <StyledCheckbox
              type="checkbox"
              onClick={() => setisChecked(!isChecked)}
              required="this field is required"
            />
            <StyledLabel>Cash on delevery only</StyledLabel>
          </StyledDetail>
          <StyledButton disabled={!isChecked}>Order Now</StyledButton>
          <StyledButton onClick={() => setIsModalOpen(false)}>
            Cancle
          </StyledButton>
        </StyledForm>
      </StyledBox>
    </StyledModalBackground>
  );
}

export default Modal;
