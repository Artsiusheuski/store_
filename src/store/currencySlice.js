import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    value: "$",
  },
  reducers: {
    selectCurrency: (state, data) => {
      state.value = data.payload;
    },
  },
});

export const { selectCurrency } = currencySlice.actions;
export const choseCurrency = (state) => state.currency.value;
export default currencySlice.reducer;
