import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    // total: 0,
    shipping: {},
  },

  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      // state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.products.splice(
        state.products.filter((id) => id === action.payload._id),
        1
      );

      state.quantity -= 1;
    },
    increaseProductQuantity: (state, action) => {
      state.products.forEach((product) => {
        if (product._id === action.payload._id) {
          product.quantity += 1;
        }
      });
      // state.total = action.payload.price * action.payload.quantity;
    },
    reduceProductQuantity: (state, action) => {
      state.products.forEach((product) => {
        if (product._id === action.payload._id) {
          product.quantity -= 1;
        }
      });
      // state.total =
      // state.total - action.payload.price * action.payload.quantity;
    },
    clearCart: (state, action) => {
      state.quantity = 0;
      state.products = [];
      // state.total = 0;
      state.shipping = {};
    },
    updateShippingInfo: (state, action) => {
      state.shipping = { ...action.payload };
    },
  },
});

export const {
  addProduct,
  reduceProduct,
  increaseProductQuantity,
  reduceProductQuantity,
  removeProduct,
  clearCart,
  updateShippingInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
