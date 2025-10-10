'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import { FaTimes, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CartSidePanel() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  

  const handleQuantityChange = (formatId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: formatId });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: formatId, quantity: newQuantity } });
    }
  };

  const handleCheckout = () => {
    dispatch({ type: 'CLOSE_CART' });
    // Navigate to checkout page
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="font-anton text-2xl font-bold text-gray-800 uppercase">
                Shopping Cart
              </h2>
              <button
                onClick={() => dispatch({ type: 'CLOSE_CART' })}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FaShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="font-poppins text-lg font-medium text-gray-600 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="font-poppins text-sm text-gray-500">
                    Add some books to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={item.formatId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* Book Image */}
                      <div className="relative w-16 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      {/* Book Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-poppins text-sm font-semibold text-gray-800 truncate">
                          {item.title}
                        </h4>
                        <p className="font-poppins text-xs text-gray-600">
                          by {item.author}
                        </p>
                        <p className="font-poppins text-xs text-gray-500 capitalize">
                          {item.format}
                        </p>
                        <p className="font-poppins text-sm font-bold text-gray-800">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.formatId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <FaMinus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="font-poppins text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.formatId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <FaPlus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-poppins text-lg font-semibold text-gray-800">
                    Total:
                  </span>
                  <span className="font-anton text-xl font-bold text-gray-800">
                    ${state.total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#575757] text-white py-3 px-6 rounded-lg font-poppins font-semibold hover:bg-[#404040] transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
