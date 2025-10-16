'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '../../contexts/CartContext';
import './animations.css';

interface CheckoutSession {
  id: string;
  payment_status: string;
  customer_details: {
    email: string;
    name: string;
  };
  amount_total: number;
  currency: string;
}

function CheckoutReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { dispatch: cartDispatch } = useCart();
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/checkout-session?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch session details');
        }

        const sessionData = await response.json();
        setSession(sessionData);

        // Clear cart on successful payment
        if (sessionData.payment_status === 'paid') {
          cartDispatch({ type: 'CLEAR_CART' });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, cartDispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 animate-pulse"></div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700">Processing your payment...</p>
          <p className="mt-2 text-sm text-gray-500">Please wait while we confirm your order</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full animate-bounce">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-red-800 mb-3">Payment Error</h3>
            <p className="text-red-600 mb-6 leading-relaxed">{error}</p>
            <button
              onClick={() => router.push('/cart')}
              className="w-full bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Return to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No session data available</p>
          <button
            onClick={() => router.push('/cart')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Return to Cart
          </button>
        </div>
      </div>
    );
  }

  const isSuccessful = session.payment_status === 'paid';

  return (
    <div className={`min-h-screen py-12 ${
      isSuccessful 
        ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100' 
        : 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100'
    }`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Animation Container */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            {/* Animated Success Icon */}
            <div className={`relative w-24 h-24 mx-auto mb-6 ${
              isSuccessful ? 'animate-bounce' : 'animate-pulse'
            }`}>
              <div className={`absolute inset-0 rounded-full ${
                isSuccessful 
                  ? 'bg-green-200 animate-ping' 
                  : 'bg-yellow-200 animate-ping'
              }`}></div>
              <div className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
                isSuccessful ? 'bg-green-100' : 'bg-yellow-100'
              } shadow-2xl`}>
                {isSuccessful ? (
                  <div className="relative">
                    <svg className="w-12 h-12 text-green-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {/* Sparkle effects */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-ping delay-300"></div>
                  </div>
                ) : (
                  <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
          
          {/* Success Message */}
          <div className="space-y-4">
            <h1 className={`text-4xl md:text-5xl font-bold ${
              isSuccessful ? 'text-green-800' : 'text-yellow-800'
            } animate-fade-in float`}>
              {isSuccessful ? '🎉 Payment Successful!' : '⏳ Payment Processing'}
            </h1>
            
            <p className={`text-xl ${
              isSuccessful ? 'text-green-700' : 'text-yellow-700'
            } max-w-2xl mx-auto leading-relaxed`}>
              {isSuccessful 
                ? 'Thank you for your purchase! Your order has been confirmed and you&apos;ll receive a confirmation email shortly.' 
                : 'Your payment is being processed. You will receive a confirmation email once it&apos;s complete.'
              }
            </p>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8 animate-slide-in-up">
          <div className={`h-2 ${
            isSuccessful ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'
          }`}></div>
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isSuccessful 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {session.payment_status.toUpperCase()}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Order ID</span>
                  <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg">
                    {session.id}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-800">
                    ${(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}
                  </span>
                </div>

                {session.customer_details?.email && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Email</span>
                    <span className="text-gray-800">{session.customer_details.email}</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  What&apos;s Next?
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Confirmation email sent
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Order processing started
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Shipping details will follow
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            Continue Shopping
          </button>
          
          {!isSuccessful && (
            <button
              onClick={() => router.push('/cart')}
              className="bg-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Return to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutReturnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 animate-pulse"></div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700">Loading your order...</p>
          <p className="mt-2 text-sm text-gray-500">Please wait while we fetch your details</p>
        </div>
      </div>
    }>
      <CheckoutReturnContent />
    </Suspense>
  );
}
