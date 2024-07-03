// slices/aiProcessSlice.js
import { createSlice } from "@reduxjs/toolkit";

const aiProcessSlice = createSlice({
  name: "aiProcess",
  initialState: {
    resultConvert: null,
    resultJob: null,
    prompt: "",
    content: "",
  },
  reducers: {
    setResultConvert: (state, action) => {
      state.resultConvert = action.payload;
    },
    setResultJob: (state, action) => {
      state.resultJob = action.payload;
    },
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setResultConvert, setResultJob, setPrompt, setContent } =
  aiProcessSlice.actions;
export default aiProcessSlice.reducer;
