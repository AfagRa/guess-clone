import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { IoCloseOutline } from "react-icons/io5"
import ScrollIndicator from "../../ui/ScrollIndicator"

const ProductImageGallery = ({ images, productName}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const modalRef = useRef(null)
  const isScrollingRef = useRef(false)
  const snapTimeoutRef = useRef(null)

  const sections = [
    { positionId: 0, title: "Section 1" },
    { positionId: 1, title: "Section 2" }
  ];

  const openModal = (index) => {
    setScrollY(window.scrollY)
    setCurrentIndex(index)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${window.scrollY}px`
    document.body.style.width = '100%'
  }

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, scrollY)
  }

  const handleSnapScroll = () => {
    if (!modalRef.current || isScrollingRef.current) return;

    const container = modalRef.current;
    const scrollTop = container.scrollTop;
    const imageHeight = container.clientHeight;
    const currentImageIndex = Math.round(scrollTop / imageHeight);
    const clampedIndex = Math.max(0, Math.min(currentImageIndex, images.length - 1));
    
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current)

    snapTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = true;
      
      container.scrollTo({
        top: clampedIndex * imageHeight,
        behavior: 'smooth'
      });
      
      setCurrentIndex(clampedIndex);
      
      setTimeout(() => {isScrollingRef.current = false}, 300);
    }, 150); 
  };

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const imageHeight = modalRef.current.clientHeight;
      modalRef.current.scrollTo({
        top: currentIndex * imageHeight,
        behavior: 'instant'
      });
    }
  }, [isOpen, currentIndex]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    }
  }, [])

  return (
    <>
      <div id="product-grid" className="relative flex overflow-x-auto md:grid md:grid-cols-1 max-md:w-full lg:grid-cols-2 scrollbar-hide">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${productName} ${i + 1}`}
            className="cursor-pointer object-cover w-full scroll-section"
            onClick={() => openModal(i)}
          />
        ))}

        {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <ScrollIndicator
            sections={images.map((_, i) => ({ positionId: i }))}
            containerId="product-grid"
            variant="grid"
          />
        </div> */}
      </div>


      {isOpen && createPortal(
        <div 
          id="product-modal" 
          ref={modalRef}
          className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-white overflow-y-auto scrollbar-hide z-[500]"
          onScroll={handleSnapScroll}
          style={{
            scrollSnapType: 'y mandatory',
            scrollBehavior: 'smooth'
          }}
        >
          <button onClick={closeModal} className="fixed cursor-pointer top-5 right-5 text-3xl z-10">
            <IoCloseOutline />
          </button>

          <div className="flex flex-wrap justify-center gap-0 max-w-7xl min-h-screen mx-auto">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${productName} ${i + 1}`}
                className="scroll-section object-contain object-center"
                style={{
                  scrollSnapAlign: 'start',
                  scrollSnapStop: 'always'
                }}
              />
            ))}
          </div>
          
          <ScrollIndicator sections={sections} containerId="product-modal" />

        </div>,
        document.body
      )}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}

export default ProductImageGallery