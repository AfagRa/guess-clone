import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice';
import wishlistReducer from './wishlistSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    wishlist: wishlistReducer,
  }
});

export default store;