import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: [],
  reducers: {
    gotUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { gotUserDetails } = loginSlice.actions;

export default loginSlice.reducer;
