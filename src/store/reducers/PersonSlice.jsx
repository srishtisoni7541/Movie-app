import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null, // Holds person details or null if not loaded
};

const personSlice = createSlice({
  name: "person", // Use lowercase naming for consistency
  initialState,
  reducers: {
    loadperson: (state, action) => {
      state.info = action.payload; // Update state with fetched person details
    },
    removeperson: (state) => {
      state.info = null; // Clear person details
    },
  },
});

export const { loadperson, removeperson } = personSlice.actions; // Export actions
export default personSlice.reducer; // Export reducer
