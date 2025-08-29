import { useEffect, useState } from "react";

const ScrollIndicator = ({ sections, containerId = null, variant='modal' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const handleScroll = () => {
      const isHorizontal = container.scrollWidth > container.clientWidth && container.scrollHeight <= container.clientHeight + 5;

      const scrollPos = isHorizontal ? container.scrollLeft : container.scrollTop;
      const scrollSize = isHorizontal 
        ? container.scrollWidth - container.clientWidth 
        : container.scrollHeight - container.clientHeight;

      const scrollProgress = scrollPos / scrollSize;
      const newIndex = Math.floor(scrollProgress * sections.length);
      const clampedIndex = Math.max(0, Math.min(newIndex, sections.length - 1));
      if (clampedIndex !== activeIndex) setActiveIndex(clampedIndex);
    };

    handleScroll(); 
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerId, sections.length, activeIndex]);

  const handleDotClick = (index) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const scrollSections = container.querySelectorAll('.scroll-section');
    if (scrollSections[index]) {
      scrollSections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  };

  return (
    <div className={`scroll-indicator${variant === 'grid' ? '-grid' : ''}`}>
      <div className={`${variant === 'grid' ? 'track-grid' : 'track'}`}>
        {sections.map((_, index) => (
          <div
            key={index}
            className={`${variant === 'grid' ? 'dot-grid' : 'dot'} ${index === activeIndex ? (variant === 'grid' ? 'active-grid' : 'active') : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};


export default ScrollIndicator;