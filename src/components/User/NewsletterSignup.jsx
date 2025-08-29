import { useState } from 'react';
import { FaBirthdayCake, FaGlassCheers } from 'react-icons/fa';
import { FaArrowRightLong, FaSackDollar } from 'react-icons/fa6';
import { IoCheckmark } from 'react-icons/io5';
import { TiArrowSortedUp } from 'react-icons/ti';

const NewsletterSignup = ({ isDesktop = false }) => {
  const [checked, setChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleToggle = () => setChecked(!checked);

  const perksDropdown = (
    <>
      {isOpen && (
        <div className='z-10 relative'>
          <TiArrowSortedUp className='w-6 h-6 mt-1 z-10 absolute -top-7 left-1/5 transform -translate-x-1/2' />
          <div className="absolute -top-2 -left-1/2 transform translate-x-1/2 shadow-lg p-3 bg-white">
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-3">
                <FaSackDollar className='w-4 h-4' />
                <div>
                  <h3 className="font-semibold">Earn cash rewards</h3>
                  <p>Receive 50 points just for signing up</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaGlassCheers className='w-4 h-4' />
                <div>
                  <h3 className="font-semibold">Enjoy exclusive VIP events</h3>
                  <p>Including early access to special collections</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaBirthdayCake className='w-4 h-4' />
                <div>
                  <h3 className="font-semibold">Celebrate with birthday rewards</h3>
                  <p>Double Points during your birthday month</p>
                </div>
              </div>

              <div>
                <p className="tracking-wide ml-7">... and so much more</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div>
      <h3 className="font-medium text-2xl mb-3">Join The List & Get 15% Off</h3>
      <p>+ free shipping on your first order</p>
      <p className="mb-4">
        and even <span onClick={toggleDropdown} className="underline cursor-pointer">more perks</span> when you create an account.
      </p>

      {perksDropdown}

      <div className="flex border-b-2 border-black p-3 mb-2 bg-white">
        <input placeholder="Email Address" className="flex-1 outline-none placeholder-gray-500"/>
        <button className="mx-2"><FaArrowRightLong className="w-5 h-5" /></button>
      </div>

      <div className="flex mb-6">
        <div 
          onClick={handleToggle} 
          className={`${isDesktop ? 'w-12 h-6' : 'w-6 h-6'} rounded-[999px] border border-gray-400 mr-3 flex items-center justify-center cursor-pointer`}
        >
          {checked && <IoCheckmark className='w-4 h-4' />}
        </div>
        <p className={`text-gray-500 leading-relaxed ${isDesktop ? '' : 'text-xs'}`} 
           style={isDesktop ? {fontSize: '0.7rem'} : {}}>
          By joining, you agree to GUESS List{' '}
          <a href="#" className="underline">Terms & Conditions</a>. 
          You can unsubscribe from marketing emails at any time. See our{' '}
          <a href="#" className="underline">Privacy Policy</a> for additional details.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;