import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  signIn: "",
  password: "",
};
const signslice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    username(state, action) {
      state.name = action.payload;
    },
    userEmail(state, action) {
      state.email = action.payload;
    },
    userPassword(state, action) {
      state.password = action.payload;
    },
    siginingIn(state, action) {
      state.signIn = action.payload;
    },
  },
});
export const { username, userEmail, siginingIn, userPassword } =
  signslice.actions;
export default signslice.reducer;
