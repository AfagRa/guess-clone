import { TfiClose } from "react-icons/tfi";

const SizeChart = ({ category, isOpen, onClose }) => {
  const sizeGuideData = {
    women: {
      alphabetic: [
        { size: 'XS', bust: '33.5 - 35"', waist: '25 - 26.5"', hip: '35.5 - 37"' },
        { size: 'S', bust: '35.5 - 37"', waist: '27 - 28.5"', hip: '37.5 - 39"' },
        { size: 'M', bust: '37.5 - 39"', waist: '29 - 30.5"', hip: '39.5 - 42"' },
        { size: 'L', bust: '39.5 - 42"', waist: '31 - 33.5"', hip: '42.5 - 44"' },
        { size: 'XL', bust: '42.5 - 44.5"', waist: '34 - 35.5"', hip: '44.5 - 46.5"' },
        { size: 'XXL', bust: '45"', waist: '36"', hip: '47"' }
      ],
      numeric: [
        { size: '0', bust: '33.5 - 34"', waist: '25 - 25.5"', hip: '35.5 - 36"' },
        { size: '2', bust: '34.5 - 35"', waist: '26 - 26.5"', hip: '36.5 - 37"' },
        { size: '4', bust: '35.5 - 36.5"', waist: '27 - 28"', hip: '37.5 - 38.5"' },
        { size: '6', bust: '37 - 38"', waist: '28.5 - 29.5"', hip: '39 - 40"' },
        { size: '8', bust: '38.5 - 39.5"', waist: '30 - 31"', hip: '40.5 - 41.5"' },
        { size: '10', bust: '40 - 41"', waist: '31.5 - 32.5"', hip: '42 - 43"' },
        { size: '12', bust: '41.5 - 42.5"', waist: '33 - 34"', hip: '43.5 - 44.5"' }
      ]
    },
    men: {
      alphabetic: [
        { size: 'XS', chest: '34 - 36"', waist: '28 - 30"', hip: '34 - 36"' },
        { size: 'S', chest: '36 - 38"', waist: '30 - 32"', hip: '36 - 38"' },
        { size: 'M', chest: '38 - 40"', waist: '32 - 34"', hip: '38 - 40"' },
        { size: 'L', chest: '40 - 42"', waist: '34 - 36"', hip: '40 - 42"' },
        { size: 'XL', chest: '42 - 44"', waist: '36 - 38"', hip: '42 - 44"' },
        { size: 'XXL', chest: '44 - 46"', waist: '38 - 40"', hip: '44 - 46"' }
      ],
      numeric: [
        { size: '30', chest: '34 - 36"', waist: '28 - 30"', hip: '34 - 36"' },
        { size: '32', chest: '36 - 38"', waist: '30 - 32"', hip: '36 - 38"' },
        { size: '34', chest: '38 - 40"', waist: '32 - 34"', hip: '38 - 40"' },
        { size: '36', chest: '40 - 42"', waist: '34 - 36"', hip: '40 - 42"' },
        { size: '38', chest: '42 - 44"', waist: '36 - 38"', hip: '42 - 44"' },
        { size: '40', chest: '44 - 46"', waist: '38 - 40"', hip: '44 - 46"' }
      ]
    },
    shoes: {
      women: [
        { size: '5', us: '5', uk: '2.5', eu: '35', cm: '22' },
        { size: '5.5', us: '5.5', uk: '3', eu: '35.5', cm: '22.5' },
        { size: '6', us: '6', uk: '3.5', eu: '36', cm: '23' },
        { size: '6.5', us: '6.5', uk: '4', eu: '37', cm: '23.5' },
        { size: '7', us: '7', uk: '4.5', eu: '37.5', cm: '24' },
        { size: '7.5', us: '7.5', uk: '5', eu: '38', cm: '24.5' },
        { size: '8', us: '8', uk: '5.5', eu: '38.5', cm: '25' },
        { size: '8.5', us: '8.5', uk: '6', eu: '39', cm: '25.5' },
        { size: '9', us: '9', uk: '6.5', eu: '40', cm: '26' },
        { size: '9.5', us: '9.5', uk: '7', eu: '40.5', cm: '26.5' },
        { size: '10', us: '10', uk: '7.5', eu: '41', cm: '27' },
        { size: '11', us: '11', uk: '8.5', eu: '42', cm: '28' }
      ],
      men: [
        { size: '6', us: '6', uk: '5.5', eu: '39', cm: '24' },
        { size: '6.5', us: '6.5', uk: '6', eu: '39.5', cm: '24.5' },
        { size: '7', us: '7', uk: '6.5', eu: '40', cm: '25' },
        { size: '7.5', us: '7.5', uk: '7', eu: '40.5', cm: '25.5' },
        { size: '8', us: '8', uk: '7.5', eu: '41', cm: '26' },
        { size: '8.5', us: '8.5', uk: '8', eu: '42', cm: '26.5' },
        { size: '9', us: '9', uk: '8.5', eu: '42.5', cm: '27' },
        { size: '9.5', us: '9.5', uk: '9', eu: '43', cm: '27.5' },
        { size: '10', us: '10', uk: '9.5', eu: '44', cm: '28' },
        { size: '10.5', us: '10.5', uk: '10', eu: '44.5', cm: '28.5' },
        { size: '11', us: '11', uk: '10.5', eu: '45', cm: '29' },
        { size: '12', us: '12', uk: '11.5', eu: '46', cm: '30' }
      ]
    }
  };

  if (!isOpen) return null;

  const renderClothingTable = (data, title, measurementTypes) => (
    <div className="mb-4">
      <h4 className="font-medium text-sm mb-2">{title}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Size</th>
              {measurementTypes.map(type => (
                <th key={type} className="px-3 py-2 text-left font-medium capitalize">
                  {type}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.size} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-2 font-medium">{row.size}</td>
                {measurementTypes.map(type => (
                  <td key={type} className="px-3 py-2">
                    {row[type]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderShoesTable = (data, title) => (
    <div className="mb-4">
      <h4 className="font-medium text-sm mb-2">{title}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left font-medium">US</th>
              <th className="px-3 py-2 text-left font-medium">UK</th>
              <th className="px-3 py-2 text-left font-medium">EU</th>
              <th className="px-3 py-2 text-left font-medium">CM</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.size} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-2 font-medium">{row.us}</td>
                <td className="px-3 py-2">{row.uk}</td>
                <td className="px-3 py-2">{row.eu}</td>
                <td className="px-3 py-2">{row.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const getCategoryTitle = () => {
    switch(category) {
      case 'women': return 'Women - Size Guide';
      case 'men': return 'Men - Size Guide';
      case 'shoes': return 'Shoes - Size Guide';
      default: return 'Size Guide';
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
        <h3 className="font-medium text-sm">{getCategoryTitle()}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg leading-none cursor-pointer">
          <TfiClose />
        </button>
      </div>
      
      <div className="p-4">
        {category === 'women' && (
          <>
            {renderClothingTable(
              sizeGuideData.women.alphabetic, 
              'Women - Alphabetic Sizes',
              ['bust', 'waist', 'hip']
            )}
            {renderClothingTable(
              sizeGuideData.women.numeric, 
              'Women - Numeric Sizes',
              ['bust', 'waist', 'hip']
            )}
          </>
        )}
        
        {category === 'men' && (
          <>
            {renderClothingTable(
              sizeGuideData.men.alphabetic, 
              'Men - Alphabetic Sizes',
              ['chest', 'waist', 'hip']
            )}
            {renderClothingTable(
              sizeGuideData.men.numeric, 
              'Men - Numeric Sizes',
              ['chest', 'waist', 'hip']
            )}
          </>
        )}
        
        {category === 'shoes' && (
          <>
            {renderShoesTable(sizeGuideData.shoes.women, 'Women\'s Shoes')}
            {renderShoesTable(sizeGuideData.shoes.men, 'Men\'s Shoes')}
          </>
        )}

      </div>
    </div>
  );
};

export default SizeChart