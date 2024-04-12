import { configureStore } from "@reduxjs/toolkit";
import SearcherSlice from "./Slicer/SearcherSlice";
import UserSlice from "./Slicer/UserSlice";

export const store = configureStore({
  reducer: {
    search: SearcherSlice,
    user: UserSlice,
  },
});
