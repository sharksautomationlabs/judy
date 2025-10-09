'use client';

import { useState } from 'react';
import { useCheckout } from '../../contexts/CheckoutContext';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Step2DeliveryProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Delivery({ onNext, onBack }: Step2DeliveryProps) {
  const { state: checkoutState, dispatch: checkoutDispatch } = useCheckout();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(checkoutState.deliveryMethod || 'standard');

  const deliveryMethods = [
    {
      id: 'standard',
      name: 'Mail | Trackable',
      description: 'Estimate delivery in 10 days',
      price: 5.50
    },
    {
      id: 'express',
      name: 'Mail | Trackable',
      description: 'Estimate delivery in 10 days',
      price: 5.50
    },
    {
      id: 'overnight',
      name: 'Mail | Trackable',
      description: 'Estimate delivery in 10 days',
      price: 5.50
    }
  ];

  const [error, setError] = useState<string>('');

  const handleContinue = () => {
    if (!selectedDeliveryMethod) {
      setError('Please select a delivery method');
      return;
    }
    
    setError('');
    checkoutDispatch({
      type: 'SET_DELIVERY_METHOD',
      payload: selectedDeliveryMethod
    });
    const selectedDelivery = deliveryMethods.find(method => method.id === selectedDeliveryMethod);
    if (selectedDelivery) {
      checkoutDispatch({
        type: 'SET_DELIVERY_PRICE',
        payload: selectedDelivery.price
      });
    }
    onNext();
  };

  return (
    <div className="space-y-4">
      <h2 className="font-poppins text-2xl font-bold text-[#535353] mb-4">
        Choose Delivery Method
      </h2>

      <div className="space-y-3">
        {deliveryMethods.map((method) => (
          <div
            key={method.id}
            className={`bg-[#d9d9d9] rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedDeliveryMethod === method.id 
                ? 'ring-2 ring-[#535353] ring-offset-2' 
                : 'hover:bg-[#c9c9c9]'
            }`}
            onClick={() => setSelectedDeliveryMethod(method.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 border-2 border-[#535353] rounded-full flex items-center justify-center">
                  {selectedDeliveryMethod === method.id && (
                    <div className="w-3 h-3 bg-[#535353] rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-[#535353]">
                    {method.name}
                  </h3>
                  <p className="font-poppins text-sm text-[#535353] font-light">
                    {method.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-poppins text-lg font-semibold text-[#535353]">
                  ${method.price.toFixed(2)} USD
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-gray-500 text-white py-2 px-4 rounded-lg font-poppins font-semibold hover:bg-gray-600 transition-colors text-sm"
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>Back</span>
        </button>
        <button
          onClick={handleContinue}
          className="flex items-center space-x-2 bg-[#535353] text-white py-2 px-4 rounded-lg font-poppins font-semibold hover:bg-[#404040] transition-colors text-sm"
        >
          <span>Continue</span>
          <FaArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
