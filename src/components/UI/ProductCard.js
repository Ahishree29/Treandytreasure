import React from "react";
import { getDiscountPrice, getOffer } from "../../helper/getDiscountPrice";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
function ProductCard({ item }) {
  const { image, brand, category, fabric, item_type, price, offer, comment } =
    item;

  return (
    <Link to={`/ProductView?ProductId=${item._id}`}>
      <div className="text-pink-900  bg-pink-200  p-3 pb-3  w-fit rounded-md shadow-md flex justify-center items-center">
        <div>
          <img
            src={image}
            alt="product"
            style={{ width: "15rem", height: "20rem" }}
          />

          <div className="flex flex-row justify-between">
            <h1 className="pt-2 font-serif">{brand.toUpperCase()}</h1>
            {comment.length > 0 &&
              comment.map((c, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-center items-center bg-yellow-500 rounded-xl px-2 m-1 "
                >
                  <FaStar className="mx-1 text-pink-800" />{" "}
                  {c.comment.reduce((acc, r) => acc + r.rate, 0) /
                    c.comment.length}
                </div>
              ))}
          </div>
          <p className=" font-thin">
            {category} {fabric} {item_type}
          </p>
          <div className="flex flex-row justify-between">
            <h2
              className={`${
                offer ? "line-through" : ""
              } flex flex-row justify-center items-center`}
            >
              <LiaRupeeSignSolid />
              {price}
            </h2>
            {(offer || offer > 0) && (
              <>
                <p className="flex flex-row justify-center items-center">
                  <LiaRupeeSignSolid /> {getDiscountPrice(price, offer)}
                </p>
                <p>{getOffer(offer)}% off</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
