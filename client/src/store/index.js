import { configureStore, createSlice } from "@reduxjs/toolkit";
const initialSearch = {
  city: "",
  dateStart: "",
  dateEnd: "",
  maxPeople: "",
};
const searchSlice = createSlice({
  initialState: initialSearch,
  name: "search",
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
    setDateStart(state, action) {
      state.dateStart = action.payload;
    },
    setDateEnd(state, action) {
      state.dateEnd = action.payload;
    },
    setMaxPeople(state, action) {
      state.maxPeople = action.payload;
    },
  },
});
export const searchActions = searchSlice.actions;
const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
  },
});
export default store;
