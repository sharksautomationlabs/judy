'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Book data structure
interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  heroImage: string;
  aboutImage: string;
  featuresImage: string;
  handsImage: string;
}

// Available books
const books: Book[] = [
  {
    id: 'book1',
    title: 'You are not the only one',
    author: 'Judith Hobson',
    price: 19.00,
    heroImage: '/images/hero-book.jpg',
    aboutImage: '/images/about-the-book.png',
    featuresImage: '/images/goodthings.png',
    handsImage: '/images/hand-left.png'
  },
  {
    id: 'book2',
    title: 'An Old Little Lady',
    author: 'Judith Hobson',
    price: 24.00,
    heroImage: '/images/hero-book2.png',
    aboutImage: '/images/about-the-book2.png',
    featuresImage: '/images/goodthings2.png',
    handsImage: '/images/hand-left2.png'
  }
];

// Context state
interface BookSelectionState {
  selectedBook: Book;
  availableBooks: Book[];
}

// Action types
type BookSelectionAction = 
  | { type: 'SELECT_BOOK'; payload: string }
  | { type: 'RESET_TO_BOOK1' };

// Initial state
const initialState: BookSelectionState = {
  selectedBook: books[0], // Default to Book 1
  availableBooks: books
};

// Reducer
function bookSelectionReducer(state: BookSelectionState, action: BookSelectionAction): BookSelectionState {
  switch (action.type) {
    case 'SELECT_BOOK':
      const book = state.availableBooks.find(b => b.id === action.payload);
      return book ? { ...state, selectedBook: book } : state;
    case 'RESET_TO_BOOK1':
      return { ...state, selectedBook: books[0] };
    default:
      return state;
  }
}

// Context
interface BookSelectionContextType {
  state: BookSelectionState;
  selectBook: (bookId: string) => void;
  resetToBook1: () => void;
}

const BookSelectionContext = createContext<BookSelectionContextType | undefined>(undefined);

// Provider component
export function BookSelectionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookSelectionReducer, initialState);

  const selectBook = (bookId: string) => {
    dispatch({ type: 'SELECT_BOOK', payload: bookId });
  };

  const resetToBook1 = () => {
    dispatch({ type: 'RESET_TO_BOOK1' });
  };

  return (
    <BookSelectionContext.Provider value={{ state, selectBook, resetToBook1 }}>
      {children}
    </BookSelectionContext.Provider>
  );
}

// Hook to use the context
export function useBookSelection() {
  const context = useContext(BookSelectionContext);
  if (context === undefined) {
    throw new Error('useBookSelection must be used within a BookSelectionProvider');
  }
  return context;
}
