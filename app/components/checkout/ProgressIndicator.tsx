'use client';

interface ProgressIndicatorProps {
  currentStep: number;
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-12">
      {/* Step 1 - Contact */}
      <div className="flex items-center">
        <div className={`w-15 h-15 rounded-full flex items-center justify-center ${
          currentStep >= 1 ? 'bg-[#535353]' : 'bg-gray-300'
        }`}>
          <span className="font-anton text-white text-2xl">1</span>
        </div>
        <div className="ml-4">
          <p className={`font-poppins text-2xl ${
            currentStep >= 1 ? 'text-[#535353]' : 'text-gray-400'
          }`}>Contact</p>
        </div>
      </div>

      {/* Line 1 */}
      <div className={`flex-1 h-0.5 mx-8 ${
        currentStep >= 2 ? 'bg-[#535353]' : 'bg-gray-300'
      }`}></div>

      {/* Step 2 - Shipping */}
      <div className="flex items-center">
        <div className={`w-15 h-15 rounded-full flex items-center justify-center ${
          currentStep >= 2 ? 'bg-[#535353]' : 'bg-gray-300'
        }`}>
          <span className="font-anton text-white text-2xl">2</span>
        </div>
        <div className="ml-4">
          <p className={`font-poppins text-2xl ${
            currentStep >= 2 ? 'text-[#535353]' : 'text-gray-400'
          }`}>Shipping</p>
        </div>
      </div>

      {/* Line 2 */}
      <div className={`flex-1 h-0.5 mx-8 ${
        currentStep >= 3 ? 'bg-[#535353]' : 'bg-gray-300'
      }`}></div>

      {/* Step 3 - Payment */}
      <div className="flex items-center">
        <div className={`w-15 h-15 rounded-full flex items-center justify-center ${
          currentStep >= 3 ? 'bg-[#535353]' : 'bg-gray-300'
        }`}>
          <span className="font-anton text-white text-2xl">3</span>
        </div>
        <div className="ml-4">
          <p className={`font-poppins text-2xl ${
            currentStep >= 3 ? 'text-[#535353]' : 'text-gray-400'
          }`}>Payment</p>
        </div>
      </div>
    </div>
  );
}
