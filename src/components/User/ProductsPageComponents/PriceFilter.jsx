import React, { useState, useEffect } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { HiMinusSmall } from 'react-icons/hi2';

const PriceFilter = ({ maxPrice, appliedPrice, setAppliedPrice }) => {
  const [selectedRange, setSelectedRange] = useState('');
  const [customMin, setCustomMin] = useState('');
  const [customMax, setCustomMax] = useState('');

  const generatePriceRanges = (max) => {
    const ranges = []
    const breaks = [50, 100, 200, 500]
    let currentMin = 0

    if (max > 0) {
      currentMin = 0;
      for (const breakPoint of breaks) {
        if (currentMin >= max) break;
        const nextMax = breakPoint;
        if (nextMax <= max) {
          ranges.push({
            id: `${currentMin}-${nextMax}`,
            label: `$${currentMin} - $${nextMax}`,
            min: currentMin,
            max: nextMax
          })
          currentMin = nextMax
        }
      }
    }
     if (max > currentMin) {
      if (currentMin > 0) {
        const lastRangeMin = currentMin;
        const lastRangeMax = max;
        const label = max > 500 ? `$500 & Over` : `$${lastRangeMin} - $${Math.round(lastRangeMax)}`;
        ranges.push({
          id: `${lastRangeMin}-max`,
          label: label,
          min: lastRangeMin,
          max: lastRangeMax
        })
      } else {
        ranges.push({
          id: `0-${max}`,
          label: `$0 - $${Math.round(max)}`,
          min: 0,
          max: max
        });
      }
    }

    return ranges
  }

  const priceRanges = generatePriceRanges(maxPrice || 1000)

  useEffect(() => {
    if (appliedPrice?.length > 0) {
        const priceFilter = appliedPrice[0];
        setCustomMin(priceFilter.min?.toString() || '')
        setCustomMax(priceFilter.max?.toString() || '')

        const matchingRange = priceRanges.find(range => range.min === priceFilter.min && range.max === priceFilter.max)
        setSelectedRange(matchingRange ? matchingRange.id : '')
    } else {
      setCustomMin('')
      setCustomMax('')
      setSelectedRange('')
    }
    }, [appliedPrice])


  const handleRangeSelect = (range) => {
    if (selectedRange === range.id) {
        setSelectedRange('');
        setAppliedPrice([]);
        setCustomMin('');
        setCustomMax('');
    } else {
        setSelectedRange(range.id);
        setAppliedPrice([{ min: range.min, max: range.max }]);
        setCustomMin(range.min.toString());
        setCustomMax(range.max.toString());
    }
  };

  const handleCustomMinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const minVal = parseInt(value || "0", 10);
    const maxVal = parseInt(customMax || "0", 10);
    if (maxVal && minVal > maxVal) setCustomMax(value)
    setCustomMin(value);
    setSelectedRange("");
  };

  const handleCustomMaxChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const maxVal = parseInt(value || "0", 10);
    const minVal = parseInt(customMin || "0", 10);
    if (minVal && maxVal < minVal) setCustomMin(value)
    setCustomMax(value);
    setSelectedRange("");
  };

  const handleApply = () => {
    const minVal = parseFloat(customMin) || 0;
    const maxVal = parseFloat(customMax) || maxPrice || 1000;
    setAppliedPrice([{ min: minVal, max: maxVal }]);
  };

  const removeRange = () => {
    setSelectedRange('');
    setAppliedPrice([]);
    setCustomMin('');
    setCustomMax('');
  };

  return (
    <div className="space-y-2">      
      <div className="space-y-2">
        {priceRanges.map((range) => {
          const isSelected = (selectedRange === range.id)
          return (
            <div key={range.id} className="flex items-center justify-start space-x-2">
              <div onClick={() => handleRangeSelect(range)} className="flex items-center space-x-2 cursor-pointer">
                {isSelected ? <IoIosCheckmarkCircleOutline /> : <MdOutlineRadioButtonUnchecked />}
                <span className={`text-sm ${isSelected ? "text-gray-400" : "text-black"}`}>
                  {range.label}
                </span>
              </div>
              {isSelected && (
                <button onClick={removeRange} className="cursor-pointer">
                  <IoMdClose />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className='pb-3 pr-3 ml-[-1rem]'>
        <span className="text-md">Price range:</span>
        <div className="flex items-center justify-between space-x-2 mt-2">
            <div className='flex items-center justify-center space-x-2'>
                <div className="flex items-center border-b border-gray-800">
                    <span className="text-sm">$</span>
                    <input
                        type="text"
                        value={customMin}
                        onChange={handleCustomMinChange}
                        className={`w-13 px-2 text-sm outline-none ${customMin ? "text-black" : "text-gray-500"}`}
                    />
                </div>
                <span><HiMinusSmall /></span>
                <div className="flex items-center border-b border-gray-800">
                    <span className="text-sm">$</span>
                    <input
                        type="text"
                        value={customMax}
                        onChange={handleCustomMaxChange}
                        className={`w-13 px-2 text-sm outline-none ${customMin ? "text-black" : "text-gray-500"}`}
                    />
                </div>
            </div>
            <button onClick={handleApply} className="text-sm underline cursor-pointer">
                Apply
            </button>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;