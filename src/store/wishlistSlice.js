import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlistItems')) || [],
  showDropdown: false
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const index = state.items.findIndex(
        item => item.id === action.payload.id &&
                item.selectedColor === action.payload.selectedColor &&
                item.selectedSize === action.payload.selectedSize
      );
      if (index !== -1) {
        state.items[index].quantity += 1;
      } 
      else {
        state.items.push({ 
          ...action.payload, 
          quantity: 1,
          color: action.payload.selectedColor,
          size: action.payload.selectedSize
        });
      }
      state.showDropdown = true;
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },

    deleteItem: (state, action) => {
      const { id, color, size } = action.payload;
      state.items = state.items.filter(item => 
        !(item.id === id && 
          item.selectedColor === color && 
          item.selectedSize === size)
      );
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, color, size, quantity } = action.payload;
      const item = state.items.find(item => 
        item.id === id && 
        item.selectedColor === color && 
        item.selectedSize === size
      );
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(wishlistItem => wishlistItem !== item);
        } else {
          item.quantity = quantity;
        }
      }
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },

    updateItem: (state, action) => {
      const { id, oldColor, oldSize, newColor, newSize, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => 
        item.id === id && 
        item.selectedColor === oldColor && 
        item.selectedSize === oldSize
      );
      
      if (itemIndex !== -1) {
        state.items[itemIndex] = {
          ...state.items[itemIndex],
          selectedColor: newColor || state.items[itemIndex].selectedColor,
          selectedSize: newSize || state.items[itemIndex].selectedSize,
          color: newColor || state.items[itemIndex].color,
          size: newSize || state.items[itemIndex].size,
          quantity: quantity || state.items[itemIndex].quantity
        };
      }
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      const { id, color, size } = action.payload;
      state.items = state.items.filter(item => 
        !(item.id === id && 
          item.selectedColor === color && 
          item.selectedSize === size)
      );
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },

    addToBasket: (state, action) => {
      const { id, color, size } = action.payload;
      state.items = state.items.filter(item => 
        !(item.id === id && 
          item.selectedColor === color && 
          item.selectedSize === size)
      );
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },

    clearWishlist: (state) => {
      state.items = [];
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },

    showWishlistDropdown: (state) => {
      state.showDropdown = true;
    },

    hideWishlistDropdown: (state) => {
      state.showDropdown = false;
    },

    toggleWishlistDropdown: (state) => {
      state.showDropdown = !state.showDropdown;
    },

    loadWishlistItems: (state) => {
      state.items = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    }
  }
});

export const {
  addItem,
  deleteItem,
  updateQuantity,
  updateItem,
  removeItem,
  addToBasket,
  clearWishlist,
  showWishlistDropdown,
  hideWishlistDropdown,
  toggleWishlistDropdown,
  loadWishlistItems
} = wishlistSlice.actions;

export default wishlistSlice.reducer;