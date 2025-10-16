'use client';

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

interface StripeCheckoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function StripeCheckoutButton({ 
  className = '', 
  children = 'Checkout with Stripe' 
}: StripeCheckoutButtonProps) {
  const { state: cartState } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cartState.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartState.items,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const { loadStripe } = await import('@stripe/stripe-js');
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        alert('Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || cartState.items.length === 0}
      className={`${className} ${
        loading || cartState.items.length === 0
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-blue-700'
      }`}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
