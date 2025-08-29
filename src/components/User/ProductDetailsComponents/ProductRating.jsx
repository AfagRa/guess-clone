const ProductRating = ({ product, renderStars }) => {
  const rating = product?.rating || 0;
  const reviewCount = product?.reviewCount || product?.reviews?.length || 0;
  const fit = product?.fit || 'true_to_size'; 

  const getQualityValue = (rating) => {
    if (rating >= 4.5) return { quality: 'Premium', value: 'Excellent' };
    if (rating >= 4) return { quality: 'Excellent', value: 'Very Good' };
    if (rating >= 3.5) return { quality: 'Very Good', value: 'Good' };
    if (rating >= 3) return { quality: 'Good', value: 'Fair' };
    if (rating >= 2.5) return { quality: 'Fair', value: 'Below Average' };
    return { quality: 'Poor', value: 'Poor' };
  };

  const { quality, value } = getQualityValue(rating);

  const getFillPattern = (fitType) => {
    switch (fitType) {
      case 'runs_small':
        return [true, false, false, false, false];
      case 'true_to_size':
        return [false, false, true, false, false];
      case 'runs_large':
        return [false, false, false, false, true];
      default:
        return [false, false, true, false, false]; 
    }
  };

  const fillPattern = getFillPattern(fit);

  return (
    <>
      {rating && 
        <div id="product-rating-section" className="bg-[#F9F9F9] rounded-lg p-10 shadow-xl max-w-screen md:max-w-3xl mx-5 sm:mx-10 md:mx-auto my-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium mb-2 max-sm:text-center">Average Rating</h3>
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 mb-8 text-sm md:text-lg">
                <div className="flex items-center gap-1">{renderStars(rating)}</div>
                <div className="flex items-center gap-1 max-sm: text-center">
                  <span>{rating} Stars</span>
                  <span>|</span>
                  <span>
                    {reviewCount} Review{reviewCount !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p>Quality: <span className="font-medium">{quality}</span> based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}</p>
                <p>Value: <span className="font-medium">{value}</span> based on {reviewCount} review{reviewCount !== 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="max-md:mt-5">
              <h3>Fit</h3>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 mt-2">
                {fillPattern.map((isFilled, index) => (
                  <div key={index} className={`w-9 sm:w-12 h-3 rounded-xs ${isFilled ? 'bg-[#979797]' : 'bg-[#DEDEDE]'}`}/>
                ))}
              </div>

              <div className="flex justify-between text-xs">
                <span className={fit === 'runs_small' ? 'font-medium text-neutral-900' : 'text-neutral-600'}>
                  Runs small
                </span>
                <span className={fit === 'true_to_size' ? 'font-medium text-neutral-900' : 'text-neutral-600'}>
                  True to size
                </span>
                <span className={fit === 'runs_large' ? 'font-medium text-neutral-900' : 'text-neutral-600'}>
                  Runs large
                </span>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
export default ProductRating;