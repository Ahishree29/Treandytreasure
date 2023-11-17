import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  size: "",
  id: "",
  addedtocart: false,
  count: 0,
  Qty: 1,
  delete: false,
  totalprice: 0,
  selector: false,
  cartItem: [],
};
const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    selectedsize(state, action) {
      state.size = action.payload;
    },
    selectedid(state, action) {
      state.id = action.payload;
    },
    cartcount(state, action) {
      state.count = action.payload;
    },
    cartactivity(state) {
      state.addedtocart = true;
    },
    itemQty(state, action) {
      state.Qty = action.payload;
    },
    itemPrice(state, action) {
      state.totalprice = action.payload;
    },
    isDelete(state, action) {
      state.delete = action.payload;
    },
    isSelector(state, action) {
      state.selector = action.payload;
    },
    setCartItem(state, action) {
      state.cartItem = action.payload;
    },
    setUpdatedCartdata(state, action) {
      const { productId, newQuantity } = action.payload;
      state.cartItem = state.cartItem.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: Number(newQuantity),
              totalPrice: Number(newQuantity) * item.price,
            }
          : item
      );
    },
    reset(state) {
      // Reset the state to its initial values
      state.size = initialState.size;
      state.id = initialState.id;
    },
  },
});
export const {
  selectedid,
  selectedsize,
  reset,
  cartcount,
  cartactivity,
  itemQty,
  isDelete,
  itemPrice,
  isSelector,
  setCartItem,
  setUpdatedCartdata,
} = cartslice.actions;
export default cartslice.reducer;
