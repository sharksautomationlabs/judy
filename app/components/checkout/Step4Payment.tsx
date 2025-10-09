'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { useCheckout } from '../../contexts/CheckoutContext';
import { FaLock, FaCheck, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface Step4PaymentProps {
  onBack: () => void;
  onPaymentSuccess: () => void;
}

export default function Step4Payment({ onBack, onPaymentSuccess }: Step4PaymentProps) {
  const { state, dispatch } = useCart();
  const { state: checkoutState } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [finalTotal, setFinalTotal] = useState(0);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const totalWithDelivery = (state.total || 0) + (checkoutState.deliveryPrice || 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\s/g, '');
      formattedValue = cleaned.replace(/(.{4})/g, '$1 ').trim();
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        formattedValue = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
      } else {
        formattedValue = cleaned;
      }
    }
    
    // Format CVV (only numbers, max 4 digits)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV (3-4 digits)';
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    
    // Calculate and store the final total before clearing cart
    const calculatedTotal = (state.total || 0) + (checkoutState.deliveryPrice || 0);
    setFinalTotal(calculatedTotal);
    
    // Generate order number
    const orderNum = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Notify parent component that payment was successful
    onPaymentSuccess();
    
    // Clear cart after successful payment
    dispatch({ type: 'CLEAR_CART' });
  };

  if (isSuccess) {
    return (
      <div className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg mx-auto"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-anton text-4xl font-bold text-gray-800 mb-4">
            🎉 Your Order is Placed!
          </h1>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="font-poppins text-lg font-semibold text-gray-700 mb-2">
              Order Number: {orderNumber}
            </p>
            <p className="font-poppins text-lg font-semibold text-gray-700">
              Total: ${finalTotal.toFixed(2)}
            </p>
          </div>
          <p className="font-poppins text-gray-600 mb-6">
            Thank you for your purchase! You will receive a confirmation email shortly with your order details and tracking information.
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-block bg-[#535353] text-white px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-[#404040] transition-colors w-full"
            >
              Continue Shopping
            </Link>
            <p className="font-poppins text-sm text-gray-500">
              Keep your order number for reference
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-poppins text-2xl font-bold text-[#535353] mb-4">
        Payment Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block font-poppins font-semibold text-[#535353] mb-2 text-sm">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`w-full h-12 pl-10 pr-4 py-3 bg-[rgba(217,217,217,0.18)] border rounded-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
                errors.cardNumber ? 'border-red-500' : 'border-black'
              }`}
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#535353] text-lg">💳</span>
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-poppins font-semibold text-[#535353] mb-2 text-sm">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              maxLength={5}
              className={`w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border rounded-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
                errors.expiryDate ? 'border-red-500' : 'border-black'
              }`}
              required
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
            )}
          </div>
          <div>
            <label className="block font-poppins font-semibold text-[#535353] mb-2 text-sm">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              maxLength={4}
              className={`w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border rounded-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
                errors.cvv ? 'border-red-500' : 'border-black'
              }`}
              required
            />
            {errors.cvv && (
              <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-poppins font-semibold text-[#535353] mb-2 text-sm">
            Cardholder Name
          </label>
          <input
            type="text"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleInputChange}
            placeholder="John Doe"
            className={`w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border rounded-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
              errors.cardholderName ? 'border-red-500' : 'border-black'
            }`}
            required
          />
          {errors.cardholderName && (
            <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>
          )}
        </div>

        <div>
          <label className="block font-poppins font-semibold text-[#535353] mb-2 text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className={`w-full h-12 px-4 py-3 bg-[rgba(217,217,217,0.18)] border rounded-lg text-[#535353] text-lg placeholder-[rgba(83,83,83,0.5)] focus:outline-none focus:ring-2 focus:ring-[#535353] ${
              errors.email ? 'border-red-500' : 'border-black'
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </form>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-gray-500 text-white py-2 px-4 rounded-lg font-poppins font-semibold hover:bg-gray-600 transition-colors text-sm"
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>Back</span>
        </button>
        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className="flex items-center space-x-2 bg-[#535353] text-white py-2 px-4 rounded-lg font-poppins font-semibold hover:bg-[#404040] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <FaLock className="w-3 h-3" />
              <span>Pay ${totalWithDelivery.toFixed(2)}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
