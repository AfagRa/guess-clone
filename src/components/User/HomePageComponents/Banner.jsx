const Banner = () => {
  const promoText = "Hassle-Free Returns on All Orders & Shipping Is Free with $125+ Purchase";

  return (
    <>
        <div className="text-gray-600 text-xs py-2 overflow-hidden relative border-b border-gray-200">
            <div className="animate-scroll whitespace-nowrap">
                <span className="inline-block px-2">{promoText}</span>
                <span className="inline-block px-2">•</span>
                <span className="inline-block px-2">{promoText}</span>
                <span className="inline-block px-2">•</span>
                <span className="inline-block px-2">{promoText}</span>
                <span className="inline-block px-2">•</span>
                <span className="inline-block px-2">{promoText}</span>
                <span className="inline-block px-2">•</span>
                <span className="inline-block px-2">{promoText}</span>
                <span className="inline-block px-2">•</span>
            </div>

            <style jsx="true">{`
            @keyframes scroll {
                0% {
                transform: translateX(0);
                }
                100% {
                transform: translateX(-50%);
                }
            }
            
            .animate-scroll {
                animation: scroll 30s linear infinite;
            }
            `}</style>
        </div>
    </>
  )
}

export default Banner