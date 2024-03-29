import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/userSlice";
import productSlice from "../redux/productSlice";

const store = configureStore({
  reducer: {
    userSlice: userSlice,
    productSlice: productSlice,
  },
});
export default store;
