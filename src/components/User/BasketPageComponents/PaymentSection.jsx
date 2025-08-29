import { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';

const PaymentSection = ({getTotalPrice, freeGiftThreshold = 150, estimatedTax = null, shipping = 'FREE'}) => {
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  
  const subtotal = getTotalPrice()
  const qualifiesForFreeShipping = subtotal >= freeGiftThreshold;
  const freeGiftValue = qualifiesForFreeShipping ? 0.00 : null;
  const estimatedTotal = subtotal + (estimatedTax || 0);
  
  const progressPercentage = Math.min((subtotal / freeGiftThreshold) * 100, 100);
  
  useEffect(() => {
    setProgressWidth(0);
    const timer = setTimeout(() => {
      setProgressWidth(progressPercentage);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [progressPercentage]);
  
  const paymentMethods = [
    { name: 'Apple Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/768px-Apple_Pay_logo.svg.png?20170518220303' },
    { name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png' },
    { name: 'Klarna', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTulba6ElbMHEAxQ1aw-3FvzVHelhUoC9JfTA&s' },
    { name: 'Google Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1280px-Google_Pay_Logo.svg.png' },
    { name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' },
    { name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
    { name: 'Amex', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png' },
    { name: 'Discover', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Discover_Card_logo.svg/2560px-Discover_Card_logo.svg.png' }
  ];

  return (
    <div className="max-w-md mx-auto pt-10 max-sm:px-4">
      <button className="w-full cursor-pointer border-2 border-black bg-black text-white py-3 rounded-full text-lg  mb-6 hover:bg-white hover:text-black transition-colors">
        Checkout
      </button>
      
      <div className="border border-gray-700 p-4 mb-6">
        <div className="text-xs mb-2">
          Your order qualifies for free shipping
        </div>
        <div className="w-full bg-gray-200 rounded-sm h-2 mb-2 overflow-hidden">
          <div 
            className="bg-blue-600 h-2 rounded-sm transition-all duration-1000 ease-out" 
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
        <div className="text-sm">
          Free Gift with Orders $150+
        </div>
      </div>
      
      <div className="bg-[#F2F2F2] p-4 pb-2">
        <h3 className="text-lg font-medium mb-4">Order summary</h3>
        
        <div className="space-y-1 border-t py-3">
          <div className="flex justify-between">
            <span className="text-md">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          {qualifiesForFreeShipping && (
            <div className="flex justify-between text-sm text-gray-500">
              <span>Free Gift with Orders $150+</span>
              <span className="">${freeGiftValue.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between ">
            <span>Estimated sales tax</span>
            <span>{estimatedTax ? `$${estimatedTax.toFixed(2)}` : '- -'}</span>
          </div>
          
          <div className="flex justify-between items-center  border-b pb-3">
            <span>Shipping</span>
            <span>{shipping}</span>
          </div>
          
          <div className="flex justify-between text-md font-medium mt-3">
            <span>Estimated total</span>
            <span>${estimatedTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-5">
        <button onClick={() => setShowPromoInput(true)} className="underline text-sm">
          Have a promo code?
        </button>
        {showPromoInput && (
          <div className="mt-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo Code"
              className="w-full px-0 py-2 border-0 border-b border-gray-400 bg-transparent focus:outline-none focus:border-black text-gray-600 text-sm"
            />
            <div className="flex justify-center mt-4">
              <button className="underline text-sm cursor-pointer">
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className='text-xs mt-6'>
        <div>
          <h4 className="mb-3">Available payment methods</h4>
          <div className="max-w-2/3 grid grid-cols-5 gap-1 mb-6">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-[#F2F2F2] h-6 p-1.5 rounded-sm flex items-center justify-center cursor-pointer">
                <img src={method.logo} alt={method.name} className='max-h-full max-w-full object-contain'/>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-2">
          Fast and convenient shipping. Easy returns within 30 days.
          <button>
            Learn more about our <span className='underline'>shipping and return</span>
          </button>{' '} policies.
        </div>
        
        <div className="flex items-center gap-2 my-4">
          <FaLock className="w-4 h-4" />
          <span>Secure checkout − Your information is encrypted.</span>
        </div>
        
        <div>
          Do you need help with your order? Give us a call at{' '}
          <span className="">1.877.44.GUESS (48377)</span> or{' '}
          <button className="underline">contact us</button>.
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;