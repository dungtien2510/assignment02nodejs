import { createSlice } from "@reduxjs/toolkit";
const errorInitial = {
  status: "",
  message: "",
  isError: false,
};
const errorSlice = createSlice({
  initial: errorInitial,
  name: error,
  reducers: {
    getError(state, action) {
      state = action.payload;
    },
  },
});

export const errorActions = errorSlice.actions;
