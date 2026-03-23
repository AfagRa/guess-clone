import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    query: '',
    isSearching: false,
    showSearchInput: false,
    searchResults: [],
    isActive: false
  }

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    showSearchInput: (state) => {
      state.showSearchInput = true;
    },
    hideSearchInput: (state) => {
      state.showSearchInput = false;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    activateSearch: (state, action) => {
      state.isActive = true;
      state.query = action.payload;
      state.showSearchInput = true;
    },
    deactivateSearch: (state) => {
      state.isActive = false;
      state.query = '';
      state.showSearchInput = false;
      state.searchResults = [];
    },
    clearSearch: (state) => {
      state.query = '';
      state.searchResults = [];
      state.isSearching = false;
    }
  }
});

export const {
  setSearchQuery,
  setSearching,
  showSearchInput,
  hideSearchInput,
  setSearchResults,
  activateSearch,
  deactivateSearch,
  clearSearch
} = searchSlice.actions;

export default searchSlice.reducer;