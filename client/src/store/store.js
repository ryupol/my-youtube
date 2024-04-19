import { configureStore } from "@reduxjs/toolkit";
import SearcherSlice from "./Slicer/SearcherSlice";

export const store = configureStore({
  reducer: {
    search: SearcherSlice,
  },
});
