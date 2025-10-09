'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useCheckout } from '../contexts/CheckoutContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Import modular components
import Step1Contact from '../components/checkout/Step1Contact';
import Step2Delivery from '../components/checkout/Step2Delivery';
import Step3Billing from '../components/checkout/Step3Billing';
import Step4Payment from '../components/checkout/Step4Payment';
import OrderSummary from '../components/checkout/OrderSummary';
import ProgressIndicator from '../components/checkout/ProgressIndicator';

// Main Checkout Page
export default function CheckoutPage() {
  const { state } = useCart();
  const { dispatch: checkoutDispatch } = useCheckout();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration check
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Redirect if cart is empty (but not if payment was successful)
  useEffect(() => {
    if (isHydrated && state.items.length === 0 && !isPaymentSuccess) {
      router.push('/cart');
    }
  }, [state.items.length, router, isPaymentSuccess, isHydrated]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      checkoutDispatch({
        type: 'SET_CURRENT_STEP',
        payload: currentStep + 1
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      checkoutDispatch({
        type: 'SET_CURRENT_STEP',
        payload: currentStep - 1
      });
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentSuccess(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Contact onNext={handleNext} />;
      case 2:
        return <Step2Delivery onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3Billing onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4Payment onBack={handleBack} onPaymentSuccess={handlePaymentSuccess} />;
      default:
        return <Step1Contact onNext={handleNext} />;
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-anton text-4xl text-[#535353] mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (state.items.length === 0 && !isPaymentSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-anton text-4xl text-[#535353] mb-4">Your cart is empty</h1>
          <Link
            href="/"
            className="inline-block bg-[#535353] text-white px-8 py-3 rounded-lg font-poppins font-semibold hover:bg-[#404040] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div 
        className="h-[120px] flex items-center justify-between px-8 relative overflow-hidden"
        style={{ backgroundImage: 'url(/images/about-book.svg)' }}
      >
        {/* Back to Shopping Button */}
        <Link
          href="/books"
          className="bg-[#535353] text-white py-2 px-4 rounded-lg font-poppins font-semibold hover:bg-[#404040] transition-colors text-sm cursor-pointer z-10"
        >
          Back to Shopping
        </Link>

        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={200}
          height={100}
          className="object-contain"
        />

        {/* Empty div for balance */}
        <div className="w-32"></div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressIndicator currentStep={currentStep} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Step Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: 'auto' }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}