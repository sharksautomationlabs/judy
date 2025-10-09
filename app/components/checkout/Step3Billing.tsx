'use client';

import { useState } from 'react';
import { useCheckout } from '../../contexts/CheckoutContext';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Step3BillingProps {
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Billing({ onNext, onBack }: Step3BillingProps) {
  const { state: checkoutState } = useCheckout();
  const [useShippingAddress, setUseShippingAddress] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
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
  });

  const handleUseShippingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setUseShippingAddress(checked);
    
    if (checked) {
      setBillingAddress({
        firstName: checkoutState.shippingAddress.firstName,
        lastName: checkoutState.shippingAddress.lastName,
        company: checkoutState.shippingAddress.company,
        address: checkoutState.shippingAddress.address,
        apt: checkoutState.shippingAddress.apt,
        country: checkoutState.shippingAddress.country,
        state: checkoutState.shippingAddress.state,
        city: checkoutState.shippingAddress.city,
        postalCode: checkoutState.shippingAddress.postalCode,
        phoneNumber: checkoutState.shippingAddress.phoneNumber
      });
    }
  };


  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="font-poppins text-2xl font-bold text-[#535353] mb-4">
        Billing Address & Payment Method
      </h2>

      {/* Billing Address */}
      <div>
        <h3 className="font-poppins text-lg font-semibold text-[#535353] mb-3">
          Billing Address
        </h3>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-3">
          {useShippingAddress ? (
            <>
              <p className="font-poppins text-sm text-[#535353]">
                {checkoutState.shippingAddress.firstName} {checkoutState.shippingAddress.lastName}
              </p>
              <p className="font-poppins text-sm text-[#535353]">
                {checkoutState.shippingAddress.address}
                {checkoutState.shippingAddress.apt && `, ${checkoutState.shippingAddress.apt}`}
              </p>
              <p className="font-poppins text-sm text-[#535353]">
                {checkoutState.shippingAddress.city}, {checkoutState.shippingAddress.state} {checkoutState.shippingAddress.postalCode}
              </p>
              <p className="font-poppins text-sm text-[#535353]">
                {checkoutState.shippingAddress.country}
              </p>
              <p className="font-poppins text-sm text-[#535353]">
                {checkoutState.shippingAddress.phoneNumber}
              </p>
            </>
          ) : (
            <>
              <p className="font-poppins text-sm text-[#535353]">
                {billingAddress.firstName} {billingAddress.lastName}
              </p>
              <p className="font-poppins text-sm text-[#535353]">
                {billingAddress.address}
                {billingAddress.apt && `, ${billingAddress.apt}`}
              </p>
              <p className="font-poppins text-sm text-[#535353]">
                {billingAddress.city}, {billingAddress.state} {billingAddress.postalCode}
              </p>
              <p className="font-poppins text-sm text-[#535353]">
                {billingAddress.country}
              </p>
              <p className="font-poppins text-sm text-[#535353]">
                {billingAddress.phoneNumber}
              </p>
            </>
          )}
        </div>
        
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useShippingAddress}
            onChange={handleUseShippingAddressChange}
            className="w-4 h-4 text-[#535353] border-2 border-[#535353] rounded focus:ring-[#535353] focus:ring-2"
          />
          <span className="font-poppins text-sm text-[#535353]">
            Use My Shipping Address
          </span>
        </label>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="font-poppins text-lg font-semibold text-[#535353] mb-3">
          Choose Payment Method
        </h3>
        
        <div className="bg-[#d9d9d9] border border-black rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-lg">💳</span>
              </div>
              <div>
                <h4 className="font-poppins text-lg font-semibold text-[#535353]">
                  Credit Card
                </h4>
                <p className="font-poppins text-xs text-[#535353]">
                  Visa, Mastercard, American Express
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold">V</span>
              </div>
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold">M</span>
              </div>
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold">A</span>
              </div>
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-sm">↑</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <span>Continue to Payment</span>
          <FaArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
