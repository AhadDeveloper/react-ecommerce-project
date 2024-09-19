import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth/auth-slice";
import productSlice from "./product/product-slice";
import cartSlice from "./cart/cart-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
