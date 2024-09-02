import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const initialState = {
  value: [],
};

export const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    toggle: (state, action) => {
      const favItem = state.value.find((item) => item.id == action.payload.id);
      if (favItem) {
        const filteredFavs = state.value.filter(
          (item) => item.id !== action.payload.id
          
        );
        state.value = [...filteredFavs];
      } else {
        state.value.push(action.payload);
      }
    },
  },
});

export const { toggle} = favSlice.actions;
export default favSlice.reducer;
