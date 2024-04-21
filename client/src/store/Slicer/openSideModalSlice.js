import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSideModal: false,
};

const openSideModalSlice = createSlice({
  name: "openSideModal",
  initialState,
  reducers: {
    setOpenSideModal(state, action) {
      state.openSideModal = action.payload;
    },
  },
});

export const { setOpenSideModal } = openSideModalSlice.actions;

export default openSideModalSlice.reducer;
