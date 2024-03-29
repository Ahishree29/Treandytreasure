import React, { useEffect, useState } from "react";
import { getDiscountPrice } from "../../helper/getDiscountPrice";
import { getTimeAgo } from "../../helper/getTimeAgo";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

function OrderView({ order }) {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (order) {
      let total = 0;
      order.orderItems.forEach((item, i) => {
        total +=
          getDiscountPrice(item.price, item.offer) * order.orderedQuantity[i];
      });
      setTotalAmount(total);
    }
  }, [order]);
  return (
    <div className="border border-pink-700 p-3 m-4 font-mono">
      <div className="flex justify-end text-pink-600">
        {getTimeAgo(order.createdAt)}
      </div>
      {order.orderItems.map((item, index) => (
        <div>
          <Link to={`/ProductView?ProductId=${item._id}`}>
            <div className="border border-black">
              <div className="flex flex-row justify-start items-center ">
                <div>
                  <img src={item.image} alt="" className="h-20 m-2" />
                </div>
                <div className="pl-3">
                  <div className="font-bold flex flex-row justify-center items-center">
                    {item.brand}
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    {item.item_type}
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    <LiaRupeeSignSolid />
                    {getDiscountPrice(item.price, item.offer)}
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    Ordered Size:{order.orderedSize[index]}
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    Ordered quantity:{order.orderedQuantity[index]}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <div className="flex flex-col justify-between mt-4 md:flex-row">
        <div className="flex flex-col md:flex-row">
          <span className=" text-lg text-pink-800 font-bold pr-4 ">Total:</span>
          <div>
            <div className="flex flex-row  items-center ">
              {" "}
              <LiaRupeeSignSolid />
              {totalAmount}
            </div>
          </div>
        </div>
        {order.orderAddress.map((ads) => (
          <div className="flex flex-col md:flex-row">
            <div className=" font-bold text-pink-800"> Delevered To: </div>
            <div className="flex flex-col pl-2">
              <span>{ads.name}</span>
              <span>{ads.mobileNum}</span>
              <span>{ads.pinCode}</span>
              <span>{ads.address}</span>

              <span>{ads.city}</span>

              <span>{ads.town}</span>

              <span>{ads.state}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderView;
