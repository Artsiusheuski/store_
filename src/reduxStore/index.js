import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import currencyReducer from "./currencySlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    currency: currencyReducer,
  },
});
