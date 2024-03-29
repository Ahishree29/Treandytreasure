import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const TrendyContex = createContext();
function TrendyProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [items, setItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const [cart, setCart] = useState(false);

  const [product, setProduct] = useState({
    offer: "",
    productType: "",
    category: "",
  });
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setUser(userInfo);
    }
  }, [navigate]);

  return (
    <TrendyContex.Provider
      value={{
        user,
        items,
        setItems,
        selectedItem,
        setSelectedItem,
        product,
        setProduct,
        cart,
        setCart,
      }}
    >
      {children}
    </TrendyContex.Provider>
  );
}
export const TrendyState = () => {
  return useContext(TrendyContex);
};
export default TrendyProvider;
