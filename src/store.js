// store.js
import { configureStore } from "@reduxjs/toolkit";
import aiProcessReducer from "./data/aiProcessSlice";
import authReducer from "./data/authSlice";

const store = configureStore({
  reducer: {
    aiProcess: aiProcessReducer,
    auth: authReducer,
  },
});

export default store;
