import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "../../../axiosInstance";
import { TrendyState } from "../../context/TrendyProvider";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../redux/productSlice";

function AppLayout() {
  const { user, cart } = TrendyState();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

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
    <div>
      <header>
        <Header />
      </header>
      <main style={{ paddingTop: "7rem" }}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default AppLayout;
