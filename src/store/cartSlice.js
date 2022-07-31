import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    increment: (state, data) => {
      let setGoods = data.payload;

      console.log(setGoods);

      if (typeof setGoods === "string") {
        console.log(setGoods);
      }
      state.value.push(setGoods);
    },
  },
});

export const { increment } = cartSlice.actions;
export const selectCart = (state) => state.cart.value;
export default cartSlice.reducer;
