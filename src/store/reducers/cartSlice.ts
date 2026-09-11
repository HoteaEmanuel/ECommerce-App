import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  price: number;
  name: string;
  qty: number;
  sum: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const idxItemInCart = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (idxItemInCart != -1) {
        state.items[idxItemInCart].qty += 1;
        state.items[idxItemInCart].sum += action.payload.price;

        return;
      }
      state.items.push({
        ...action.payload,
        ...action.payload,
        qty: 1,
        sum: action.payload.price,
      });
    },
    removeItemFromCart: (state, action) => {
      const idxItemInCart = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (idxItemInCart == -1) {
        return;
      }
      if (state.items[idxItemInCart].qty < 1) return;
      if (state.items[idxItemInCart].qty == 1)
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      else {
        state.items[idxItemInCart].qty--;
        state.items[idxItemInCart].sum -= action.payload.price;
      }
    },
    removeProductFromCart: (state, action) => {
      const idxItemInCart = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (idxItemInCart == -1) {
        return;
      }

      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeProductFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
