import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: [],
  reducers: {
    bookTicket: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { bookTicket } = bookingSlice.actions;
export default bookingSlice.reducer;
