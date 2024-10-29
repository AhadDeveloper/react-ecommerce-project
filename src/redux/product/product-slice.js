import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {
    electronics: [],
  },
  adminProducts: {
    electronics: [],
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setAdminProducts(state, action) {
      state.adminProducts = action.payload;
    },
    deleteProduct: (state, action) => {
      const updatedProducts = {};
      const id = action.payload.id;

      Object.entries(state.products).forEach(([categoryKey, CategoryVal]) => {
        const categoryProducts = CategoryVal.filter((item) => item.id !== id);
        updatedProducts[categoryKey] = categoryProducts;
      });

      state.adminProducts = updatedProducts;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
