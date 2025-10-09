'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  apt: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
}

interface CheckoutState {
  shippingAddress: ShippingAddress;
  deliveryMethod: string;
  deliveryPrice: number;
  currentStep: number;
}

type CheckoutAction =
  | { type: 'UPDATE_SHIPPING_ADDRESS'; payload: Partial<ShippingAddress> }
  | { type: 'SET_DELIVERY_METHOD'; payload: string }
  | { type: 'SET_DELIVERY_PRICE'; payload: number }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'RESET_CHECKOUT' };

const CheckoutContext = createContext<{
  state: CheckoutState;
  dispatch: React.Dispatch<CheckoutAction>;
} | null>(null);

const checkoutReducer = (state: CheckoutState, action: CheckoutAction): CheckoutState => {
  switch (action.type) {
    case 'UPDATE_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddress: { ...state.shippingAddress, ...action.payload }
      };
    
    case 'SET_DELIVERY_METHOD':
      return {
        ...state,
        deliveryMethod: action.payload
      };
    
    case 'SET_DELIVERY_PRICE':
      return {
        ...state,
        deliveryPrice: action.payload
      };
    
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload
      };
    
    case 'RESET_CHECKOUT':
      return {
        shippingAddress: {
          firstName: '',
          lastName: '',
          company: '',
          address: '',
          apt: '',
          country: '',
          state: '',
          city: '',
          postalCode: '',
          phoneNumber: ''
        },
        deliveryMethod: '',
        deliveryPrice: 0,
        currentStep: 1
      };
    
    default:
      return state;
  }
};

// Load initial state from localStorage
const getInitialCheckoutState = (): CheckoutState => {
  if (typeof window === 'undefined') {
    return {
      shippingAddress: {
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        apt: '',
        country: '',
        state: '',
        city: '',
        postalCode: '',
        phoneNumber: ''
      },
      deliveryMethod: '',
      deliveryPrice: 0,
      currentStep: 1
    };
  }

  try {
    const saved = localStorage.getItem('checkoutState');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        shippingAddress: parsed.shippingAddress || {
          firstName: '',
          lastName: '',
          company: '',
          address: '',
          apt: '',
          country: '',
          state: '',
          city: '',
          postalCode: '',
          phoneNumber: ''
        },
        deliveryMethod: parsed.deliveryMethod || '',
        deliveryPrice: parsed.deliveryPrice || 0,
        currentStep: parsed.currentStep || 1
      };
    }
  } catch (error) {
    console.error('Error loading checkout state from localStorage:', error);
  }

  return {
    shippingAddress: {
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apt: '',
      country: '',
      state: '',
      city: '',
      postalCode: '',
      phoneNumber: ''
    },
    deliveryMethod: '',
    deliveryPrice: 0,
    currentStep: 1
  };
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(checkoutReducer, getInitialCheckoutState());

  // Save checkout state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('checkoutState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving checkout state to localStorage:', error);
    }
  }, [state]);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
