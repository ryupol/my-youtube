import { configureStore } from "@reduxjs/toolkit";
import SearcherSlice from "./Slicer/SearcherSlice";
import openSidebarSlice from "./Slicer/openSidebarSlice";

export const store = configureStore({
  reducer: {
    search: SearcherSlice,
    openSidebar: openSidebarSlice,
  },
});
