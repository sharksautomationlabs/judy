'use client';

import { useState } from 'react';
import { useCheckout } from '../../contexts/CheckoutContext';

interface Step1ContactProps {
  onNext: () => void;
}

export default function Step1Contact({ onNext }: Step1ContactProps) {
  const { state: checkoutState, dispatch: checkoutDispatch } = useCheckout();
  const [formData, setFormData] = useState({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format phone number with proper spacing
    if (name === 'phoneNumber') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 6) {
        formattedValue = `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
      } else if (cleaned.length >= 3) {
        formattedValue = `(${cleaned.substring(0, 3)}) ${cleaned.substring(3)}`;
      } else {
        formattedValue = cleaned;
      }
    }

    // Format postal code (US format: 12345 or 12345-6789)
    if (name === 'postalCode') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length > 5) {
        formattedValue = `${cleaned.substring(0, 5)}-${cleaned.substring(5, 9)}`;
      } else {
        formattedValue = cleaned;
      }
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    checkoutDispatch({
      type: 'UPDATE_SHIPPING_ADDRESS',
      payload: { [name]: formattedValue }
    });
  };

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number in (123) 456-7890 format';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.postalCode)) {
      // More flexible validation - allow basic 5-digit codes
      const cleanPostalCode = formData.postalCode.replace(/\D/g, '');
      if (cleanPostalCode.length < 5) {
        newErrors.postalCode = 'Please enter a valid postal code (at least 5 digits)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-poppins text-2xl font-bold text-[#535353] mb-4">
        Contact Information
      </h2>

      <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
        {/* First Row - First Name & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className={`w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border rounded-tl-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
                errors.firstName ? 'border-red-500' : 'border-black'
              }`}
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className={`w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border rounded-tr-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
                errors.lastName ? 'border-red-500' : 'border-black'
              }`}
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Company */}
        <div className="relative">
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company / Organization (Optional)"
            className="w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border border-black text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353]"
          />
        </div>

        {/* Address */}
        <div className="relative">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className={`w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
              errors.address ? 'border-red-500' : 'border-black'
            }`}
            required
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        {/* Apt/Floor/Suite */}
        <div className="relative">
          <input
            type="text"
            name="apt"
            value={formData.apt}
            onChange={handleInputChange}
            placeholder="Apt / Floor / Suite (Optional)"
            className="w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border border-black text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353]"
          />
        </div>

        {/* Country */}
        <div className="relative">
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
            className={`w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
              errors.country ? 'border-red-500' : 'border-black'
            }`}
            required
          />
          {errors.country && (
            <p className="text-red-500 text-xs mt-1">{errors.country}</p>
          )}
        </div>

        {/* State */}
        <div className="relative">
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="State (Optional)"
            className="w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border border-black text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353]"
          />
        </div>

        {/* City & Postal Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className={`w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
                errors.city ? 'border-red-500' : 'border-black'
              }`}
              required
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="12345 or 12345-6789"
              maxLength={10}
              className={`w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
                errors.postalCode ? 'border-red-500' : 'border-black'
              }`}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div className="relative">
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="(123) 456-7890"
            maxLength={14}
            className={`w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border rounded-bl-lg rounded-br-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
              errors.phoneNumber ? 'border-red-500' : 'border-black'
            }`}
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>
      </form>

      {/* Continue Button */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#535353] text-white py-2 px-4 rounded-lg font-poppins font-semibold hover:bg-[#404040] transition-colors text-sm cursor-pointer"
        >
          Continue to Delivery
        </button>
      </div>
    </div>
  );
}
