import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useRef, useState } from 'react';

const SecondCategoryScroller = () => {
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
    <SimpleBar autoHide={false} forceVisible="x" className="gallery-container py-[20px]">
      <div className="flex pb-2 w-full">
        <div className="flex-shrink-0 w-[60%] md:w-1/3 cursor-pointer relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            onClick={() => window.location.href = '/category/jeans'}
            src="https://img.guess.com/video/upload/q_auto,w_640,h_768,c_fill/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_09A.mp4"
            alt="Guess jeans"
            className="w-full object-cover sm:h-auto"
          />
          <button onClick={handleVideo} className="text-gray-300 absolute right-[4%] bottom-[12%] flex z-10">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <h3
            onClick={() => window.location.href = '/category/jeans'}
            className="my-3 md:my-5 text-center text-md sm:text-xl md:text-lg lg:text-xl text-light hover:underline decoration-1 underline-offset-8"
          >
            GUESS JEANS
          </h3>
        </div>

        <div className="flex-shrink-0 w-[60%] md:w-1/3 cursor-pointer" onClick={() => window.location.href = '/category/women'}>
          <img
            src="https://img.guess.com/image/upload/q_auto,f_auto,dpr_auto,w_1280,c_limit/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_10"
            alt="Guess Services"
            className="w-full object-cover sm:h-auto"
          />
          <h3 className="my-3 md:my-5 text-center text-md sm:text-xl md:text-lg lg:text-xl text-light hover:underline decoration-1 underline-offset-8">
            GUESS Services
          </h3>
        </div>

        <div className="flex-shrink-0 w-[60%] md:w-1/3 cursor-pointer" onClick={() => window.location.href = '/category/kids'}>
          <img
            src="https://img.guess.com/image/upload/q_auto,f_auto,dpr_auto,w_1280,c_limit/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_11"
            alt="Guess kids"
            className="w-full object-cover sm:h-auto"
          />
          <h3 className="my-3 md:my-5 text-center text-md sm:text-xl md:text-lg lg:text-xl text-light hover:underline decoration-1 underline-offset-8">
            GUESS Kids
          </h3>
        </div>
      </div>
    </SimpleBar>
  );
};

export default SecondCategoryScroller;
