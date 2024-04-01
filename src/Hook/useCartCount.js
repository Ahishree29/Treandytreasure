import { useDispatch } from "react-redux";
import axios from "../axiosInstance";
import { useState } from "react";
import { setCartCount } from "../redux/productSlice";

function useCartCount() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userInfo"));

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
      if (data || data === 0) {
        setCount(data);
        dispatch(setCartCount(data));
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  return { count, getCartCount };
}

export default useCartCount;
