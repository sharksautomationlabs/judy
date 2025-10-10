'use client';

import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useBookSelection } from '../contexts/BookSelectionContext';

interface BookFormatSelectorProps {
  className?: string;
}

export default function BookFormatSelector({ className = "" }: BookFormatSelectorProps) {
  const { state: bookState } = useBookSelection();
  const { dispatch } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<'hardcover' | 'paperback' | 'ebook' | 'kindle'>('paperback');

  const selectedBook = bookState.selectedBook;
  const selectedFormatData = selectedBook.formats.find(format => format.type === selectedFormat);

  const handleAddToCart = () => {
    if (!selectedFormatData) return;

    const formatId = `${selectedBook.id}-${selectedFormat}`;
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: selectedBook.id,
        formatId,
        title: selectedBook.title,
        author: selectedBook.author,
        price: selectedFormatData.price,
        image: selectedBook.heroImage,
        format: selectedFormat
      }
    });
    
    // Open the cart after adding item
    dispatch({ type: 'TOGGLE_CART' });
  };

  const formatLabels = {
    hardcover: 'Hardcover',
    paperback: 'Paperback',
    ebook: 'E-book',
    kindle: 'Kindle'
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Format Selection */}
      <div className="space-y-4">
        <h3 className="font-poppins text-lg sm:text-xl text-[#575757] font-bold opacity-80">
          Choose Format:
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {selectedBook.formats.map((format) => (
            <button
              key={format.type}
              onClick={() => setSelectedFormat(format.type)}
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                selectedFormat === format.type
                  ? 'border-[#575757] bg-[#575757] text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-[#575757] hover:bg-gray-50'
              }`}
            >
              <div className="text-center">
                <span className="font-poppins font-semibold text-xs">
                  {formatLabels[format.type]} - ${format.price.toFixed(2)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="font-poppins font-semibold text-gray-800">
              {formatLabels[selectedFormat]} - {selectedBook.title}
            </div>
            <div className="font-poppins text-sm text-gray-600">
              by {selectedBook.author}
            </div>
          </div>
          <div className="text-right">
            <div className="font-anton text-2xl font-bold text-[#575757]">
              ${selectedFormatData?.price.toFixed(2)}
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-[#575757] text-white py-4 px-6 rounded-full font-poppins font-semibold text-lg hover:bg-[#404040] transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
