import { FiMapPin } from 'react-icons/fi';
import NewsletterSignup from './NewsletterSignup';
import SocialLinks from './SocialLinks';
import FooterCategories from './FooterCategories';
import { footerSections } from '../../data/footerData';

const UserFooter = () => {
  return (
    <footer className="w-full sm:w-[50vw] mx-auto lg:w-full overflow-hidden">
      <div className='w-full'>
        <div className="bg-[#F5F5F5] px-4 py-8 lg:hidden">
          <NewsletterSignup />
        </div>

        <div className="lg:bg-[#F5F5F5] px-4 lg:hidden">
          {Object.values(footerSections).map((section, index) => (
            <FooterCategories
              key={index}
              title={section.title}
              items={section.items}
              isMobile={true}
            />
          ))}
        </div>

        <div className="lg:bg-[#F5F5F5] pl-3 pr-10 hidden lg:grid lg:grid-cols-6 py-11" 
             style={{ gridTemplateColumns: '15% 15% 15% 15% 10% auto' }}>
          
          {Object.values(footerSections).map((section, index) => (
            <FooterCategories 
              key={index}
              title={section.title}
              items={section.items}
            />
          ))}
          
          <div></div>
          
          <div>
            <NewsletterSignup isDesktop={true} />
          </div>
        </div>

        <div className="bg-white px-4 lg:pl-10 lg:pr-6 py-3">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            <div className="order-1 lg:order-3">
              <SocialLinks />
            </div>

            <div className="flex items-center justify-center order-2 lg:order-1 lg:ml-8">
              <FiMapPin className="mr-1" />
              <span className="text-xs underline cursor-pointer">United States</span>
            </div>

            <div className="flex flex-col items-center lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 text-xs text-gray-500 order-3 lg:order-2">
              <p className="text-center">&copy; GUESS? Inc. {new Date().getFullYear()} All rights reserved.</p>
              <div className="flex items-center justify-center space-x-2">
                <a href="#" className="underline">Terms & Conditions</a>
                <a href="#" className="underline">Privacy Policy</a>
                <a href="#" className="underline">Your Privacy Choices</a>
                <img className='w-auto h-3' src="https://cdn.prod.website-files.com/611a337a2fd33f1abb7d18d3/642326e1716fa918149c3c7b_Eo-1rwkXUAEG46w.webp" alt="privacy" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;