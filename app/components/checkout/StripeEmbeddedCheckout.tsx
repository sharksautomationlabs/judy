'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { useCart } from '../../contexts/CartContext';
import { useCheckout } from '../../contexts/CheckoutContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeEmbeddedCheckoutProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function StripeEmbeddedCheckout({ onError }: StripeEmbeddedCheckoutProps) {
  const { state: cartState } = useCart();
  const { state: checkoutState } = useCheckout();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    if (cartState.items.length === 0) {
      setError('Your cart is empty');
      setLoading(false);
      return;
    }

    const createCheckoutSession = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/checkout_sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cartState.items,
            customerEmail: '', // Will be collected in the embedded form
            deliveryMethod: checkoutState.deliveryMethod,
            deliveryPrice: checkoutState.deliveryPrice,
          }),
        });

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
          }
          
          console.error('API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            errorData: errorData
          });
          
          const errorMessage = errorData?.error || `HTTP ${response.status}: Failed to create checkout session`;
          throw new Error(errorMessage);
        }

        const { clientSecret } = await response.json();
        
        if (!clientSecret) {
          throw new Error('No client secret returned from server');
        }
        
        setClientSecret(clientSecret);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    createCheckoutSession();
  }, [cartState.items, checkoutState.deliveryMethod, checkoutState.deliveryPrice, onError]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading checkout...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Checkout Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
