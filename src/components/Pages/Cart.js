import React, { useEffect, useState } from "react";
import { TrendyState } from "../../context/TrendyProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import CartCard from "../UI/CartCard";
import { getDiscountPrice } from "../../helper/getDiscountPrice";
import { LiaRupeeSignSolid } from "react-icons/lia";
import PulseLoader from "react-spinners/PulseLoader";
import Empty from "./Empty";
import { useDispatch, useSelector } from "react-redux";
import { setCartCount } from "../../redux/productSlice";

function Cart({ handleNext }) {
  const navigate = useNavigate();
  const cartpage = true;
  const dispatch = useDispatch();
  const { user, setCart } = TrendyState();
  const [isdelete, setIsDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selected, setSelected] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const totalCartItem = item?.length || 0;
  const count = useSelector((state) => state.productSlice.cartCount);
  useEffect(() => {
    const getCartItem = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const response = await axios.get(
          "/api/cart/",

          config
        );
        if (response) {
          setItem(response.data);
          setCart(true);
          setIsUpdate(false);
          setIsDelete(false);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    };

    getCartItem();
  }, [isdelete, isUpdate, userInfo.token, setCart]);

  const handleCartDelete = async (chatId) => {
    setLoading(false);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.delete(`/api/cart/${chatId}`, config);
      if (response) {
        setIsDelete(true);
        dispatch(setCartCount(count - 1));

        setCart(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (item) {
      let selectedCount = 0;
      let totalpricewithoffer = 0;
      item.forEach((i) => {
        if (i.isSelected) {
          selectedCount++;
        }
        if (i.isSelected) {
          totalpricewithoffer =
            totalpricewithoffer +
            getDiscountPrice(i.product.price, i.product.offer) * i.quantity;
        }
      });
      setSelected(selectedCount);
      setTotalPrice(totalpricewithoffer);
    }
  }, [item]);

  return loading ? (
    <div className="flex justify-center items-center p-7 flex-col h-screen">
      <PulseLoader
        color={"#e4007c"}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : !loading && item.length < 1 ? (
    <div className="flex justify-center items-center">
      <Empty cartpage={cartpage} />
    </div>
  ) : (
    !loading &&
    item.length >= 1 && (
      <div className="flex justify-center items-center p-7 flex-col">
        <div className="p-5 m-6 bg-white rounded-sm w-full shadow-xl flex justify-between shadow-pink-200 sm:flex-row flex-col">
          <button
            className="bg-pink-800 text-white p-2 rounded-md font-semibold text-xl font-serif"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <span className="font-semibold text-xl font-serif text-pink-800 flex flex-row justify-center items-center">
            {selected}/{totalCartItem} items are selected
          </span>
          <span className="font-semibold text-xl font-serif text-pink-800 flex flex-row justify-center items-center">
            total Price : <LiaRupeeSignSolid /> {totalPrice}
          </span>
          {selected > 0 && (
            <button
              className="bg-pink-800 text-white p-2 rounded-md font-semibold text-xl font-serif"
              onClick={handleNext}
            >
              Proceed to Order
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
          {item &&
            item.map((i, index) => (
              <CartCard
                item={i}
                key={index}
                handleCartDelete={handleCartDelete}
                setIsUpdate={setIsUpdate}
              />
            ))}
        </div>
      </div>
    )
  );
}

export default Cart;
