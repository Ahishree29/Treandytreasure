import React, { useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { getDiscountPrice, getOffer } from "../../helper/getDiscountPrice";
import { HiOutlineX } from "react-icons/hi";
import axios from "../../axiosInstance";
import { TrendyState } from "../../context/TrendyProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function CartCard({ item, handleCartDelete, setIsUpdate }) {
  const { _id, product, selectedSize, quantity, isSelected } = item;
  const { user } = TrendyState();
  const [sizing, setSizing] = useState(selectedSize);
  const [qty, setQty] = useState(quantity);

  if (!product) {
    return null;
  }

  const handleSizing = async (e) => {
    const newSize = e.target.value;
    setSizing(newSize);
  };

  const handleQuantity = async (e) => {
    const newQuantity = e.target.value;
    setQty(newQuantity);
  };

  const handleBlur = async () => {
    await handleCartUpdate(sizing, qty);
  };

  const handleCartUpdate = async (newSize, newQuantity) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.put(
        `/api/cart/`,
        { size: newSize, quantity: Number(newQuantity), cartId: _id },
        config
      );

      if (response) {
        setIsUpdate(true);
      }
    } catch (error) {
      setIsUpdate(false);
      toast.error("Failed to update cart item. Please try again.");
      console.error("Error updating cart item:", error);
    }
  };
  const handleCheckboxChange = async (cartId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.put(
        `/api/cart/isSelect`,
        { cartId },
        config
      );

      if (response) {
        setIsUpdate(true);
      }
    } catch (error) {
      setIsUpdate(false);
      toast.error("Failed to update cart item. Please try again.");
      console.error("Error updating cart item:", error);
    }
  };

  return (
    <div className="flex bg-pink-300 p-2 rounded-md shadow-lg shadow-pink-200">
      <div className="flex-shrink-0 pr-2">
        <input
          type="checkbox"
          className="text-xl font-bold p-2 bg-pink-500 cursor-pointer rounded-none"
          style={{ transform: "scale(1.5)" }}
          onChange={() => handleCheckboxChange(_id)}
          checked={isSelected}
        />
      </div>
      <Link to={`/ProductView?ProductId=${product._id}`}>
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt="product"
            style={{ height: "10rem", width: "8rem" }}
          />
        </div>
      </Link>
      <div className="flex flex-col flex-grow pl-2">
        <Link to={`/ProductView?ProductId=${product._id}`}>
          <div className="flex flex-row justify-between">
            <h1 className="pt-2 font-serif text-lg font-bold">
              {product.brand.toUpperCase()}
            </h1>
            <div className=" flex flex-col sm:flex-row">
              <button
                className="text-pink-700 text-xl font-bold p-2 flex "
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCartDelete(_id);
                }}
              >
                <HiOutlineX />
              </button>
            </div>
          </div>
          <p className="font-thin">
            {product.category} {product.fabric} {product.item_type}
          </p>
        </Link>
        <div className="flex flex-col justify-between">
          {product.size.length > 0 && (
            <div className="flex flex-row items-center">
              <span className="text-lg">Size:</span>
              <select
                value={sizing}
                onChange={handleSizing}
                onBlur={handleBlur}
                className="text-pink-500 rounded-lg mx-2 bg-pink-200 font-bold z-30"
              >
                {product.size.map((s, index) => (
                  <option key={index}>{s}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-row items-center">
            <span className="text-lg">Qty:</span>
            <select
              value={qty}
              onChange={handleQuantity}
              onBlur={handleBlur}
              className="text-pink-500 rounded-lg mx-2 bg-pink-200 font-bold"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Link to={`/ProductView?ProductId=${product._id}`}>
          <div className="flex flex-row justify-between">
            <h2
              className={`${product.offer && "line-through"} flex items-center`}
            >
              <LiaRupeeSignSolid />
              {product.price}
            </h2>
            {(product.offer || product.offer > 0) && (
              <div className="flex flex-row ">
                <p className="flex flex-row justify-center items-center">
                  <LiaRupeeSignSolid />{" "}
                  {getDiscountPrice(product.price, product.offer)}
                </p>
                <p className="text-gray-600">{getOffer(product.offer)}% OFF</p>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CartCard;
