import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navSearch: false,
};

const navSearchSlice = createSlice({
  name: "navSearch",
  initialState,
  reducers: {
    setNavSearch(state, action) {
      state.navSearch = action.payload;
    },
  },
});

export const { setNavSearch } = navSearchSlice.actions;

export default navSearchSlice.reducer;
