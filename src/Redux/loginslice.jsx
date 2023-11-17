import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  name: "",
  isloggedin: false,
  userId: "",
};
const loginsclice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUserMail(state, action) {
      state.email = action.payload;
    },
    loginUserPassword(state, action) {
      state.password = action.payload;
    },
    loginUser(state, action) {
      state.name = action.payload;
    },
    loggedin(state, action) {
      state.isloggedin = action.payload;
    },
    logiuserId(state, action) {
      state.userId = action.payload;
    },
  },
});
export const {
  loginUserMail,
  loginUserPassword,
  loginUser,
  loggedin,
  logiuserId,
} = loginsclice.actions;
export default loginsclice.reducer;
