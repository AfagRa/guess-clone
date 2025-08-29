import { FaPause, FaPlay } from "react-icons/fa";

const HeroSection = ({ videoRef, isPlaying, handleVideo }) => {

  return (
    <>
        <div className='w-full xl:h-screen relative overflow-hidden'>
            <video className='w-full h-full object-contain xl:object-cover' ref={videoRef} autoPlay muted loop src="https://img.guess.com/video/upload/q_auto/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_01.mp4" />
            <img className='z-10 w-[30%] max-w-[1000px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/Guess-LOGO-WHT" alt="" />
            <button onClick={handleVideo} className='text-gray-300 absolute right-[12%] bottom-[10%] flex z-10'>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
        </div>

        {/* <div className='relative w-full h-screen overflow-hidden'>
            <video className='w-full h-full object-cover' ref={videoRef} autoPlay muted loop src="https://img.guess.com/video/upload/q_auto/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_01.mp4" />
            <img className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-18 w-auto z-10' src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/Guess-LOGO-WHT" alt="Guess logo" />
            <button onClick={handleVideo} className='absolute right-40 bottom-18 text-gray-300 hover:text-white transition-colors duration-200 z-10 p-2'>
            {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
        </div> */}
    </>
  );
};

export default HeroSection;
