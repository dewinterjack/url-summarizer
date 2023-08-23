import React, { useReducer } from 'react';
import { BookmarkContext, bookmarkReducer, initialState } from './BookmarkContext';

const BookmarkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookmarkReducer, initialState);

  return (
    <BookmarkContext.Provider value={{ state, dispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;
