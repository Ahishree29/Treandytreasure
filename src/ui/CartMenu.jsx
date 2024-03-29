import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { itemPrice, itemQty } from "../Redux/cartslice";

const StyledMenu = styled.div`
  background-color: #a5612a;
  margin-bottom: 20px;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  height: 70px;
  width: 100%;
  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    height: auto;
  }
`;
const StyledElement = styled.div`
  color: white;
  margin: auto;
`;
const StyledButton = styled.button`
  background-color: black;
  color: white;
  margin: auto;
  padding: 10px;
  height: 3rem;
  width: 6rem;
  border-radius: 7px;
`;
function CartMenu() {
  const dispatch = useDispatch();
  const [totalQty, setTotalQty] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItem = useSelector((store) => store.cartslice.cartItem);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen((modal) => !modal);
  };

  useEffect(() => {
    if (cartItem.length > 0) {
      const totalQuantity = cartItem.reduce(
        (total, item) => total + item.quantity,
        0
      );

      const totalPrice = cartItem.reduce(
        (total, item) => total + Number(item.totalPrice),
        0
      );
      setTotalQty(totalQuantity);
      setTotalPrice(totalPrice);
    }
  }, [cartItem]);

  dispatch(itemQty(totalQty));
  dispatch(itemPrice(totalPrice));

  return (
    <>
      <StyledMenu>
        <StyledButton onClick={() => navigate(-1)}>Back</StyledButton>
        <StyledElement>
          No.of Items:{" "}
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>
            {totalQty}
          </span>{" "}
        </StyledElement>
        <StyledElement>
          Total Price:{" "}
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>
            Rs.{totalPrice}/-
          </span>{" "}
        </StyledElement>
        <StyledButton onClick={openModal}>Buy</StyledButton>
      </StyledMenu>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default CartMenu;
