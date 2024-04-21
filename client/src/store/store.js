import { configureStore } from "@reduxjs/toolkit";
import SearcherSlice from "./Slicer/SearcherSlice";
import openSidebarSlice from "./Slicer/openSidebarSlice";
import openSideModalSlice from "./Slicer/openSideModalSlice";
import navSearchSlice from "./Slicer/navSearchSlice";

export const store = configureStore({
  reducer: {
    search: SearcherSlice,
    openSidebar: openSidebarSlice,
    openSideModal: openSideModalSlice,
    navSearch: navSearchSlice,
  },
});
