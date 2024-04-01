import React, { useEffect, useState } from "react";
import { TrendyState } from "../../context/TrendyProvider";
import axios from "../../axiosInstance";
import toast from "react-hot-toast";
import PulseLoader from "react-spinners/PulseLoader";
import OrderView from "../UI/OrderView";
import Empty from "./Empty";

function MyOrder() {
  const { user } = TrendyState();
  const [item, setItem] = useState([]);
  const orderpage = true;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getOrder = async () => {
      setIsLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get(
          "/api/order/",

          config
        );
        if (response) {
          setItem(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error);
        setIsLoading(false);
      }
    };

    getOrder();
  }, [user.token]);

  return isLoading ? (
    <div className="flex justify-center items-center p-7 flex-col h-screen">
      <PulseLoader
        color={"#e4007c"}
        loading={isLoading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : item.length <= 0 ? (
    <div className="flex justify-center items-center">
      <Empty orderpage={orderpage} />
    </div>
  ) : (
    Array.isArray(item) && (
      <div>
        {item.map((i, index) => (
          <OrderView order={i} key={index} />
        ))}
      </div>
    )
  );
}

export default MyOrder;
