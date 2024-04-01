import React, { useEffect, useState } from "react";
import Slider from "../UI/Slider";
import Corosal from "../UI/Corosal";
import axios from "../../axiosInstance";
import { TrendyState } from "../../context/TrendyProvider";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../redux/productSlice";
import { WomenItem } from "../../Configuration/WomenItem";
import { MenItem } from "../../Configuration/MenItem";
import { KidsItem } from "../../Configuration/KidsItem";

function Home() {
  const dispatch = useDispatch();
  const { user, cart } = TrendyState();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getCartCount = async () => {
      if (!user) {
        return;
      }
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get("/api/cart/getCount", config);
        if (data) {
          setCount(data);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    getCartCount();
  }, [user, cart]);
  useEffect(() => {
    dispatch(setCartCount(count));
  }, [dispatch, cart, count, user]);
  return (
    <>
      <div className="flex flex-row justify-center items-center p-2 ">
        <Slider />
      </div>
      <div className="p-4 ">
        <div className=" font-serif text-2xl font-bold text-pink-700">
          Women's Collection
        </div>
        <Corosal sliderItem={WomenItem} category="women" />
      </div>
      <div className="p-4">
        <div className=" font-serif text-2xl font-bold text-pink-700">
          Men's Collection
        </div>
        <Corosal sliderItem={MenItem} category="men" />
      </div>
      <div className="p-4">
        <div className=" font-serif text-2xl font-bold text-pink-700">
          kid's Collection
        </div>
        <Corosal sliderItem={KidsItem} category="kids" />
      </div>
    </>
  );
}

export default Home;
