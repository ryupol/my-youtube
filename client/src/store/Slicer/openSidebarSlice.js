import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSidebar: true,
};

const openSidebarSlice = createSlice({
  name: "openSidebar",
  initialState,
  reducers: {
    setOpenSidebar(state, action) {
      state.openSidebar = action.payload;
    },
  },
});

export const { setOpenSidebar } = openSidebarSlice.actions;

export default openSidebarSlice.reducer;
