'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useCheckout } from '../../contexts/CheckoutContext';
import Link from 'next/link';
import Image from 'next/image';

export default function OrderSummary() {
  const { state } = useCart();
  const { state: checkoutState } = useCheckout();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const totalWithDelivery = (state.total || 0) + (checkoutState.deliveryPrice || 0);

  return (
    <div className="bg-[#d9d9d9] p-6 rounded-lg sticky top-8">
      <h2 className="font-poppins text-2xl font-bold text-[#535353] mb-6">
        Your Cart
      </h2>
      
      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {!isHydrated ? (
          <div className="text-center py-8">
            <p className="font-poppins text-[#535353]">Loading...</p>
          </div>
        ) : state.items.length === 0 ? (
          <div className="text-center py-8">
            <p className="font-poppins text-[#535353]">No items in cart</p>
          </div>
        ) : (
          state.items.map((item) => (
            <div key={item.formatId} className="flex items-center space-x-4 p-4 bg-white rounded-lg">
              <div className="relative w-16 h-20 animate-float">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-anton text-lg text-[#535353] uppercase">
                  {item.title}
                </h4>
                <p className="font-barlow text-sm text-[#535353] capitalize">
                  {item.format}
                </p>
                <p className="font-barlow text-sm text-[#535353]">
                  QTY: {item.quantity}
                </p>
                <p className="font-barlow text-lg text-[#535353]">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pricing Breakdown */}
      {!isHydrated ? (
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-poppins text-lg text-[#535353]">Sub Total</span>
            <span className="font-barlow text-lg text-[#535353]">Loading...</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-poppins text-lg text-[#535353]">Taxes</span>
            <span className="font-barlow text-lg text-[#535353]">$0.00</span>
          </div>
          <div className="border-t border-[#535353] pt-2">
            <div className="flex justify-between items-center">
              <span className="font-poppins text-xl font-extrabold text-[#535353]">Total</span>
              <span className="font-barlow text-xl font-extrabold text-[#535353]">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-poppins text-lg text-[#535353]">Sub Total</span>
            <span className="font-barlow text-lg text-[#535353]">
              ${(state.total || 0).toFixed(2)}
            </span>
          </div>
          {checkoutState.deliveryPrice > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-poppins text-lg text-[#535353]">Delivery</span>
              <span className="font-barlow text-lg text-[#535353]">
                ${checkoutState.deliveryPrice.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="font-poppins text-lg text-[#535353]">Taxes</span>
            <span className="font-barlow text-lg text-[#535353]">$0.00</span>
          </div>
          <div className="border-t border-[#535353] pt-2">
            <div className="flex justify-between items-center">
              <span className="font-poppins text-xl font-extrabold text-[#535353]">Total</span>
              <span className="font-barlow text-xl font-extrabold text-[#535353]">
                ${totalWithDelivery.toFixed(2)} USD
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Update Cart Link */}
      <div className="mb-6">
        <Link
          href="/cart"
          className="font-poppins text-blue-600 text-lg hover:underline"
        >
          Update Cart
        </Link>
      </div>
    </div>
  );
}
