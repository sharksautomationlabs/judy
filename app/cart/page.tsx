'use client';

import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    // Navigate back to home or books page
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-anton text-6xl md:text-8xl text-[#535353] mb-4">
            Your Cart
          </h1>
          <p className="font-barlow text-2xl md:text-4xl text-[#535353]">
            {!isHydrated ? 'Loading...' : `${state.items.length} Item${state.items.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#535353] mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2">
            {!isHydrated ? (
              <div className="text-center py-16">
                <h2 className="font-anton text-4xl text-[#535353] mb-4">Loading...</h2>
              </div>
            ) : state.items.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="font-anton text-4xl text-[#535353] mb-4">Your cart is empty</h2>
                <p className="font-poppins text-lg text-[#535353] mb-8">
                  Add some books to get started!
                </p>
                <Link
                  href="/"
                  className="inline-block bg-[#535353] text-white px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-[#404040] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {state.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-6 p-6 bg-gray-50 rounded-lg"
                  >
                    {/* Book Image */}
                    <div className="relative w-24 h-32 flex-shrink-0 animate-float">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    {/* Book Details */}
                    <div className="flex-1">
                      <h3 className="font-anton text-2xl text-[#535353] uppercase mb-2">
                        {item.title}
                      </h3>
                      <p className="font-poppins text-lg text-[#535353] mb-2">
                        by {item.author}
                      </p>
                      <p className="font-poppins text-2xl text-[#535353] font-medium">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-[#535353] rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <FaMinus className="w-4 h-4 text-[#535353]" />
                        </button>
                        <span className="px-4 py-2 font-poppins text-lg text-[#535353] min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <FaPlus className="w-4 h-4 text-[#535353]" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="font-poppins text-2xl text-[#535353] font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 hover:bg-red-100 transition-colors rounded-lg"
                      >
                        <FaTrash className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-8">
              <h2 className="font-barlow text-xl text-[#535353] mb-6">Order Summary</h2>
              
              {/* Subtotal */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-barlow text-lg text-[#535353]">Subtotal</span>
                <span className="font-barlow text-lg text-[#535353]">
                  {!isHydrated ? 'Loading...' : `$${state.total.toFixed(2)}`}
                </span>
              </div>

              {/* Shipping & Taxes */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-barlow text-sm text-[#535353]">Shipping & Taxes</span>
                <span className="font-barlow text-sm text-[#535353]">Calculate & Check Out</span>
              </div>

              {/* Divider */}
              <div className="border-t border-[#535353] mb-6"></div>

              {/* Total */}
              <div className="flex justify-between items-center mb-8">
                <span className="font-barlow text-xl font-semibold text-[#535353]">Total</span>
                <span className="font-barlow text-xl font-semibold text-[#535353]">
                  {!isHydrated ? 'Loading...' : `$${state.total.toFixed(2)}`}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleCheckout}
                  disabled={state.items.length === 0}
                  className="w-full bg-[#535353] text-white py-3 px-6 rounded-lg font-poppins font-semibold hover:bg-[#404040] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Out
                </button>
                
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-[#d9d9d9] text-[#535353] py-3 px-6 rounded-lg font-poppins font-semibold hover:bg-[#c9c9c9] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
