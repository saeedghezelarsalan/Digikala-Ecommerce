import { createSlice } from "@reduxjs/toolkit";

const AddToCart = createSlice({
  name: "cart",
  initialState: { cart: [], total: 0 },
  reducers: {
    addProductToCart: (state, action) => {
      const updatedCart = [...state.cart];
      const updatedItemIndex = updatedCart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (updatedItemIndex < 0) {
        updatedCart.push({ ...action.payload, quantity: 1 });
      } else {
        const updatedItem = { ...updatedCart[updatedItemIndex] };
        updatedItem.quantity++;
        updatedCart[updatedItemIndex] = updatedItem;
      }
      return {
        ...state,
        cart: updatedCart,
        total: state.total + 1,
      };
    },
    removeProductFromCart: (state, action) => {
      const updatedCart = [...state.cart];
      const updatedItemIndex = updatedCart.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedItem = { ...updatedCart[updatedItemIndex] };
      if (updatedItem.quantity === 1) {
        const filteredCart = updatedCart.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          cart: filteredCart,
          total: state.total - 1,
        };
      } else {
        updatedItem.quantity--;
        updatedCart[updatedItemIndex] = updatedItem;
        return {
          ...state,
          cart: updatedCart,
          total: state.total - 1,
        };
      }
      
    },
    removeAllFromCart : (state,action)=>{
      return {cart:[],total:0}
    }
  },
});

export const { addProductToCart, removeProductFromCart, removeAllFromCart } = AddToCart.actions;

export default AddToCart.reducer;