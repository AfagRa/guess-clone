import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice';
import wishlistReducer from './wishlistSlice';
import searchReducer from './searchSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    basket: basketReducer,
    wishlist: wishlistReducer,
    search: searchReducer,
  }
});

export default store;