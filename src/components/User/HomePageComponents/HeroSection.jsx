import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const HeroSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
        <div className='w-full xl:h-screen relative overflow-hidden'>
            <video className='w-full h-full object-contain xl:object-cover' 
            ref={videoRef} autoPlay muted loop
            src="https://img.guess.com/video/upload/q_auto/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_01.mp4" />
            <img className='z-10 w-[30%] max-w-[1000px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' 
            src="https://img.guess.com/image/upload/f_auto,q_auto/v2/EU/Asset/Europe/E-Commerce/00_splash_page/240924_BrandsSplashpage_FW24/Guess-LOGO-WHT" alt="guess logo" />
            <button onClick={handleVideo} className='text-gray-300 absolute right-[12%] bottom-[10%] flex z-10'>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
        </div>
    </>
  );
};

export default HeroSection;
