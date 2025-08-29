import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) item.quantity = quantity;
    },

    updateItem: (state, action) => {
      const { id, color, size, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        if (color) item.color = color;
        if (size) item.size = size;
        if (quantity) item.quantity = quantity;
      }
    },

    moveToFavorites: (state, action) => {
      // Here you’d ideally REMOVE from basket and ADD to favorites slice
      state.items = state.items.filter(item => item.id !== action.payload);
      // dispatch(addFavorite(action.payload)) could live in another slice
    },

    clearBasket: (state) => {
      state.items = [];
    }
  }
});

export const {
  addItem,
  deleteItem,
  updateQuantity,
  updateItem,
  moveToFavorites,
  clearBasket
} = basketSlice.actions;

export default basketSlice.reducer;
