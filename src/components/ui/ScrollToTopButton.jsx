import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolledHeight = window.pageYOffset;
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent = scrollableHeight > 0 ? (scrolledHeight / scrollableHeight) * 100 : 0;

            setScrollProgress(percent);
            setIsVisible(percent > 1);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const r = 18; 
    const circumference = 2 * Math.PI * r;
    const strokeDashoffset = circumference * (1 - scrollProgress / 100);

    return (
        <>
            {isVisible && (
                <button onClick={scrollToTop} className="fixed bottom-10 right-10 w-14 h-14 bg-gray-200 cursor-pointer rounded-full flex items-center justify-center shadow-lg z-50">
                    <svg className="absolute w-14 h-14 -rotate-90" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r={r} stroke="rgba(255, 0, 0, 0.2)" strokeWidth="4" fill="none" />
                        <circle cx="20" cy="20" r={r} stroke="rgba(255, 0, 0, 1)" strokeWidth="4" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-150 ease-out" />
                    </svg>
                    <FaArrowUp className="text-red-500 text-2xl z-10" />
                </button>
            )}
        </>
    );
};

export default ScrollToTopButton;
