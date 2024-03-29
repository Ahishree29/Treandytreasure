import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
};
const productSlice = createSlice({
  name: "product",
  initialState,  reducers: {
    setCartCount(state, action) {
      state.cartCount = action.payload;
    },
  },
});
export const { setCartCount } = productSlice.actions;
export default productSlice.reducer;
