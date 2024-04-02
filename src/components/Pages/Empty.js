import React from "react";
import { useNavigate } from "react-router-dom";

function Empty({ productpage, cartpage, orderpage }) {
  const navigate = useNavigate();
  return (
    <>
      {productpage && (
        <div
          className="h-screen justify-center items-center pt-40 "
          onClick={() => navigate("/")}
        >
          <img
            src="./emptyproductpage.png"
            alt=""
            className="h-96 rounded-full shadow-pink-400 shadow-2xl"
          />
        </div>
      )}

      {cartpage && (
        <div
          className="h-screen justify-center items-center pt-40"
          onClick={() => navigate("/")}
        >
          <img
            src="./EmptyCart.png"
            alt=""
            className="h-96 rounded-full shadow-pink-400 shadow-2xl"
          />
        </div>
      )}

      {orderpage && (
        <div
          className="h-screen justify-center items-center pt-40"
          onClick={() => navigate("/")}
        >
          <img
            src="./OrderEmpty.png"
            alt=""
            className="h-96 rounded-full shadow-pink-400 shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

export default Empty;
