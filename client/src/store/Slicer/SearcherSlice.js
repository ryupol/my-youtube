import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const SearcherSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setSearch } = SearcherSlice.actions;

export default SearcherSlice.reducer;
