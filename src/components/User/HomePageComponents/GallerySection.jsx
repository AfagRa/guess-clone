import SimpleBar from "simplebar-react";

const GallerySection = () => {
  return (
    <SimpleBar autoHide={false} forceVisible="x" className="gallery-container pb-[20px]">
        <div className="flex pb-2 w-full">
            <div className="flex-shrink-0 w-[60%] md:w-1/3 cursor-pointer" onClick={() => window.location.href = '/category/women'}>
            <img
                src="https://img.guess.com/image/upload/q_auto,f_auto,dpr_auto,w_1280,c_limit/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_02"
                alt="women clothing"
                className="w-full object-cover sm:h-auto"
            />
            </div>
            
            <div className="flex-shrink-0 w-[60%] md:w-1/3 cursor-pointer" onClick={() => window.location.href = '/category/handbags'}>
            <img
                src="https://img.guess.com/image/upload/q_auto,f_auto,dpr_auto,w_1280,c_limit/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_03"
                alt="handbags"
                className="w-full object-cover sm:h-auto"
            />
            </div>
            
            <div className="flex-shrink-0 w-[60%] md:w-1/3 cursor-pointer" onClick={() => window.location.href = '/category/women'}>
            <img
                src="https://img.guess.com/image/upload/q_auto,f_auto,dpr_auto,w_1280,c_limit/v1/NA/Asset/North%20America/E-Commerce/Guess/Bug%20Number/10774/G_Site_Home_ContentCenter_July_10774_04"
                alt="women"
                className="w-full object-cover sm:h-auto"
            />
            </div>
        </div>
    </SimpleBar>
  );
};

export default GallerySection;
