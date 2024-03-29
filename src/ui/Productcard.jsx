import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SizeButtons from "./SizeButtons";
import { useDispatch, useSelector } from "react-redux";
import { cartactivity, cartcount, reset, selectedid } from "../Redux/cartslice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ItemCard from "./ItemCard";
import { useGetCart } from "../Hook/useGetCart";
import { BaseUrl } from "../helper";

const CardStyle = styled.div`
  padding-left: 7rem;

  @media (max-width: 630px) {
    padding-left: 4rem;
  }

  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

function Productcard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedsize = useSelector((store) => store.cartslice.size);
  const idparam = useSelector((store) => store.cartslice.id);
  const [addCart, setAddCart] = useState(false);
  const { cartItem } = useGetCart();
  const count = useSelector((store) => store.cartslice.count);

  const params = [idparam, selectedsize];

  const {
    _id: id,
    color,
    price,
    brand,
    type,
    fabric,
    gender,
    image,
    occation,
    stock,
    size,
  } = product;
  const user_Id = useSelector((store) => store.loginslice.userId);
  const isloggedin = useSelector((store) => store.loginslice.isloggedin);

  useEffect(
    function () {
      async function addcart() {
        try {
          if (!idparam || !selectedsize) return dispatch(reset());
          else {
            const response = await fetch(`${BaseUrl}/api/cart/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(
                  localStorage.getItem("token")
                )} `,
              },
              body: JSON.stringify({
                id: idparam,
                size: selectedsize,
                userId: user_Id,
              }),
            });

            if (response.ok) {
              toast.success("Product is added to cart 🥳");
              const newCartCount = count + 1;

              dispatch(cartcount(newCartCount));
            } else {
            }
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error);
        }
      }

      addcart();
      setAddCart(false);

      dispatch(reset());
    },
    [addCart]
  );

  async function handelcart(id) {
    if (!isloggedin) {
      navigate("/login");
    } else {
      if (!selectedsize) {
        alert("please select the apropriate size");
      }

      setAddCart(true);
      dispatch(selectedid(id));
      dispatch(cartactivity());
    }
  }

  return (
    <CardStyle>
      <ItemCard
        id={id}
        image={image}
        brand={brand}
        gender={gender}
        occation={occation}
        fabric={fabric}
        color={color}
        price={price}
        stock={stock}
        size={size}
        handelcart={handelcart}
        type={type}
      />
    </CardStyle>
  );
}

export default Productcard;
