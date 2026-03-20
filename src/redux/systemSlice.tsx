import { createSlice } from "@reduxjs/toolkit";

// Redux Reducer for System Settings State Mangagement
export const systemSlice = createSlice({
  name: "system",
  initialState: {
    turnOffDialogOpen: false,
  },
  reducers: {
    setTurnOffDialogOpen: (state, action) => {
      state.turnOffDialogOpen = action.payload;
    },
  },
});

export const { setTurnOffDialogOpen } = systemSlice.actions;
export default systemSlice.reducer;
