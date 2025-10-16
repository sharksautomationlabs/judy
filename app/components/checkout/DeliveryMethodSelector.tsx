'use client';

import React from 'react';
import { useCheckout } from '../../contexts/CheckoutContext';

const deliveryOptions = [
  { id: 'standard', name: 'Standard Delivery', price: 4.99, description: '5-7 business days' },
  { id: 'express', name: 'Express Delivery', price: 9.99, description: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Delivery', price: 19.99, description: 'Next business day' },
];

export default function DeliveryMethodSelector() {
  const { state, dispatch } = useCheckout();

  const handleDeliveryChange = (method: string, price: number) => {
    dispatch({ type: 'SET_DELIVERY_METHOD', payload: method });
    dispatch({ type: 'SET_DELIVERY_PRICE', payload: price });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Method</h3>
      
      <div className="space-y-3">
        {deliveryOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
              state.deliveryMethod === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="delivery"
              value={option.id}
              checked={state.deliveryMethod === option.id}
              onChange={() => handleDeliveryChange(option.id, option.price)}
              className="mr-3 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{option.name}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
                <div className="font-semibold text-gray-900">${option.price.toFixed(2)}</div>
              </div>
            </div>
          </label>
        ))}
      </div>
      
      {state.deliveryMethod && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-green-800 font-medium">
              Selected: {deliveryOptions.find(opt => opt.id === state.deliveryMethod)?.name}
            </span>
            <span className="text-green-800 font-semibold">
              +${state.deliveryPrice.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
