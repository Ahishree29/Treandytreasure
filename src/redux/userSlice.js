import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  id: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
  },
});
export const { setUserName, setId } = userSlice.actions;
export default userSlice.reducer;
