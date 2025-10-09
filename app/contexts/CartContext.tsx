'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        const newState = {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        };
        return newState;
      }
      
      const newItem = { ...action.payload, quantity: 1 };
      const updatedItems = [...state.items, newItem];
      const newState = {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      };
      return newState;
    }
    
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items
        .map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        )
        .filter(item => item.quantity > 0);
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      };
    }
    
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    
    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage if available
  const getInitialState = (): CartState => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart-state');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            items: parsed.items || [],
            isOpen: false, // Always start with cart closed
            total: parsed.total || 0
          };
        } catch (error) {
          console.error('Error parsing saved cart state:', error);
        }
      }
    }
    return {
      items: [],
      isOpen: false,
      total: 0
    };
  };

  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart-state', JSON.stringify({
        items: state.items,
        total: state.total
      }));
    }
  }, [state.items, state.total]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.error('useCart must be used within a CartProvider');
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
