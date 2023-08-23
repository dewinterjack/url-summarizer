import { createContext } from 'react';

export const initialState = {
  bookmarks: []
};

export const BookmarkContext = createContext(initialState);

export const bookmarkReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return { bookmarks: [...state.bookmarks, action.payload] };
    case 'REMOVE_BOOKMARK':
      return { bookmarks: state.bookmarks.filter((_, index) => index !== action.payload) };
    default:
      return state;
  }
};
