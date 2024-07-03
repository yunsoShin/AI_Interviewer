// slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { login, logout, onUserStateChange } from "../pages/api/firebase";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const listenToUserStateChange = () => (dispatch) => {
  onUserStateChange((user) => {
    dispatch(setUser(user));
  });
};

export default authSlice.reducer;
