import { useEffect, useState } from "react";

import CartCard from "../ui/CartCard";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setCartItem } from "../Redux/cartslice";
import { useGetCart } from "../Hook/useGetCart";
import { useNavigate } from "react-router-dom";
import { loggedin, loginUser, logiuserId } from "../Redux/loginslice";
import CartMenu from "../ui/CartMenu";
import EmptyPage from "../ui/EmptyPage";
import Spinner from "../ui/Spinner";
const PageStyle = styled.div`
  padding-top: 8.5rem;
  height: 100%;
  padding-bottom: 20rem;
  @media (max-width: 730px) {
    padding-top: 12.5rem;
  }
`;
const StyledCart = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-left: 0 auto;
  gap: 10px;
  width: 100;
  margin-left: 2rem;
  padding: 2rem;
  @media (max-width: 1800px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 1250px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 0 auto;
    padding-left: 10rem;
  }
  @media (max-width: 1110px) {
    padding-left: 5rem;
  }
  /* @media (max-width: 1250px) {
    grid-template-columns: repeat(1, 1fr);

    padding-left: 18rem;
  } */
  @media (max-width: 900px) {
    padding-left: 4rem;
  }
  @media (max-width: 860px) {
    padding-left: 3rem;
  }
  @media (max-width: 815px) {
    padding-left: 2rem;
  }
  @media (max-width: 795px) {
    padding-left: 1rem;
  }
  @media (max-width: 766px) {
    grid-template-columns: repeat(1, 1fr);
    padding-left: 13rem;
  }
  @media (max-width: 735px) {
    padding-left: 11rem;
  }
  @media (max-width: 690px) {
    padding-left: 9rem;
  }
  @media (max-width: 630px) {
    padding-left: 7rem;
  }
  @media (max-width: 615px) {
    padding-left: 6rem;
  }
  @media (max-width: 445px) {
    padding-left: 5rem;
  }
  @media (max-width: 392px) {
    padding-left: 4rem;
  }
  @media (max-width: 365px) {
    padding-left: 3rem;
  }
  @media (max-width: 330px) {
    padding-left: 2rem;
  }
  @media (max-width: 300px) {
    padding-left: 3rem;
  }
  @media (max-width: 280px) {
    padding-left: 4rem;
  }
  @media (max-width: 260px) {
    padding-left: 3rem;
  }
  @media (max-width: 230px) {
    padding-left: 2rem;
  }
  @media (max-width: 195px) {
    padding-left: 1rem;
  }
`;
function Cart() {
  const { cartItem, isLoading } = useGetCart();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(setCartItem(cartItem));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const user_id = JSON.parse(localStorage.getItem("userid"));

    if (user && token && user_id) {
      dispatch(loginUser(user));
      dispatch(logiuserId(user_id));
      dispatch(loggedin(true));
    } else {
      navigate("/login");
    }
  }, []);
  function handleNavigate() {
    navigate(-1);
  }
  if (isLoading) {
    return <Spinner />;
  }
  if (!cartItem.length) {
    return (
      <EmptyPage
        message="Cart is empty!😑 Explore our Trendy Treasure, fill it with fashion gems, and make a style statement.✨"
        onclick={handleNavigate}
      />
    );
  }

  return (
    <PageStyle>
      <CartMenu />
      <StyledCart>
        {cartItem.map((item) => (
          <CartCard item={item} key={item} />
        ))}
      </StyledCart>
    </PageStyle>
  );
}

export default Cart;
