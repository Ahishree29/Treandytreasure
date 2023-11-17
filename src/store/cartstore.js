import { configureStore } from "@reduxjs/toolkit";
import cartslice from "../Redux/cartslice";
import signslice from "../Redux/signslice";
import loginslice from "../Redux/loginslice";

const cartstore = configureStore({
  reducer: {
    cartslice: cartslice,
    signslice: signslice,
    loginslice: loginslice,
  },
});

export default cartstore;
