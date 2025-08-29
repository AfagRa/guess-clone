import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    // Add other slices here as you create them
    // favorites: favoritesReducer,
    // user: userReducer,
  },
  // Optional: Add middleware for debugging
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Add console log to see store creation
console.log('🏪 Redux store created successfully:', store);
console.log('🗂️ Initial state:', store.getState());

export default store;