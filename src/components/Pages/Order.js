import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { TrendyState } from "../../context/TrendyProvider";
import { getDiscountPrice } from "../../helper/getDiscountPrice";
import { LiaRupeeSignSolid } from "react-icons/lia";
import toast from "react-hot-toast";

import useCartCount from "../../Hook/useCartCount";

function Order({ handlePrevious, handleNext }) {
  const { user, setCart } = TrendyState();

  const { getCartCount } = useCartCount();
  const [address, setAddress] = useState([]);
  const [items, setItems] = useState([]);
  const [totalPriceWithOffer, setTotalPriceWithOffer] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [randomNumber, setRandomNumber] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getCartCount();
  }, [getCartCount]);
  useEffect(() => {
    const getAddress = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get("/api/address/select", config);
        if (response && response.data) {
          setAddress(response.data);
        }
      } catch (error) {
        console.error("Error fetching delivery address:", error);
      }
    };
    getAddress();
  }, [user.token]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get("/api/cart/isSelect", config);
        if (response && response.data) {
          setItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    getCartItems();
  }, [user.token]);
  useEffect(() => {
    const generateRandomNumber = () => {
      const min = 100000;
      const max = 999999;
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      setRandomNumber(randomNum);
    };
    generateRandomNumber();
  }, []);
  const placeOrder = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.post(
        "/api/order/",
        { totalprice: totalPriceWithOffer, orderNum: randomNumber },
        config
      );
      if (response && response.data) {
        setSuccess(true);
        toast.success("Order placed successfully");

        setCart(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      let totalpricewithoffer = 0;
      let totalprice = 0;

      items.forEach((item) => {
        if (item.product.price) {
          totalpricewithoffer +=
            getDiscountPrice(item.product.price, item.product.offer) *
            item.quantity;

          totalprice += item.product.price * item.quantity;
        }
      });

      setTotalPrice(totalprice);
      setTotalPriceWithOffer(totalpricewithoffer);
    }
  }, [items]);

  return (
    <>
      <div className="flex flex-row justify-between items-center border shadow-lg shadoe-pink-400 p-2 w-full mt-7">
        <div className="flex flex-row">
          <button onClick={handlePrevious} className="font-bold text-lg px-2">
            <HiOutlineArrowSmLeft />
          </button>
          <h1 className="font-bold text-lg font-serif">Order</h1>
        </div>
      </div>
      <div className="p-5">
        {address.map((ads, index) => (
          <div
            key={index}
            className="border border-pink-800 p-4 flex flex-row justify-around items-center "
          >
            <div className="font-serif font-semibold pr-7 text-lg text-pink-700">
              Address
            </div>
            <div className="flex flex-col justify-center font-mono">
              <p>{ads.name}</p>
              <p>{ads.mobileNum}</p>
              <p>{ads.address}</p>
              <p>{ads.pinCode}</p>
              <p>{ads.town}</p>
              <p>{ads.city}</p>
              <p>{ads.state}</p>
            </div>
          </div>
        ))}
        {!success && (
          <div className="border border-pink-800 p-4 flex flex-row justify-around items-center mt-5">
            <div className="font-serif font-semibold pr-7 text-lg text-pink-700">
              Order item
            </div>
            <div>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-center font-mono p-2"
                >
                  <img
                    src={item.product.image}
                    alt="product"
                    className="w-10 h-20 "
                  />
                  <div className="flex flex-col px-3 ">
                    <div>size: {item.selectedSize}</div>
                    <div>quantity: {item.quantity}</div>
                    <div className="flex flex-row">
                      price:
                      <span className="flex flex-row justify-center items-center">
                        <LiaRupeeSignSolid />
                        {getDiscountPrice(
                          item.product.price,
                          item.product.offer
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="border border-pink-800 p-4 flex flex-col justify-around items-center mt-5">
        {success ? (
          <div className="text-green-600 text-2xl font-serif font-bold">
            🥳🥳 Order successfull🎉🎉
          </div>
        ) : (
          <div>
            <span className="text-pink-700 font-bold text-lg pb-3">
              Order Detail
            </span>
            <div>
              <div className="flex justify-around  font-mono">
                <span>Actual Price:</span> <span>{totalPrice}</span>
              </div>
              <div className="flex justify-around font-mono">
                <span>Discount:</span>{" "}
                <span>{totalPrice - totalPriceWithOffer}</span>
              </div>
            </div>
            <div className=" border border-t-4 border-pink-800 font-mono">
              Total Amount: {totalPriceWithOffer}
            </div>

            <button
              className=" bg-pink-700 p-2 rounded-md m-3 text-white"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Order;
