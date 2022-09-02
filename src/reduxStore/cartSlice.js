import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: JSON.parse(localStorage.getItem("cartValue"))
      ? JSON.parse(localStorage.getItem("cartValue"))
      : [],
    summ: JSON.parse(localStorage.getItem("cartSumm"))
      ? JSON.parse(localStorage.getItem("cartSumm"))
      : {},
  },
  reducers: {
    increment: (state, data) => {
      let setGoods = data.payload;
      let uniqueKey;
      if (typeof setGoods !== "string") {
        uniqueKey = setGoods.keyID;
      } else uniqueKey = setGoods;

      if (!state.summ[uniqueKey]) {
        state.summ[uniqueKey] = 0;
        state.value.push(setGoods);
      }
      state.summ[uniqueKey]++;

      const { value, summ } = state;

      localStorage.setItem("cartValue", JSON.stringify(value));
      localStorage.setItem("cartSumm", JSON.stringify(summ));
    },
    dicrement: (state, data) => {
      let uniqueKey = data.payload;
      if (state.summ[uniqueKey] > 0) state.summ[uniqueKey]--;
      if (state.summ[uniqueKey] < 1) {
        state.value = state.value.filter((item) => item.keyID !== uniqueKey);
      }

      const { value, summ } = state;

      localStorage.setItem("cartValue", JSON.stringify(value));
      localStorage.setItem("cartSumm", JSON.stringify(summ));
    },
  },
});

export const { increment, dicrement } = cartSlice.actions;
export const selectCart = (state) => state.cart.value;
export default cartSlice.reducer;
