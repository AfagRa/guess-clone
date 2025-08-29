import { IoIosCheckmarkCircleOutline, IoMdClose } from "react-icons/io"
import { MdOutlineRadioButtonUnchecked } from "react-icons/md"

const DiscountFilter = ({availableDiscount, appliedDiscount, setAppliedDiscount}) => {
    const validDiscounts = availableDiscount.filter(d => d > 0).sort((a, b) => a - b)

    const generateDiscountRanges = (discounts) => {
        const ranges = []
        const minDiscount = Math.min(...discounts)
        const maxDiscount = Math.max(...discounts)

        let start = Math.floor(minDiscount / 10) * 10
        let end = Math.ceil(maxDiscount / 10) * 10

        while (start < end) {
            const next = start + 10
            ranges.push({
                min: start,
                max: next,
                label: `${start}% - ${next}%`
            })
            start = next
        }

        if (end < 100 || end === maxDiscount) {
            ranges.push({
                min: end,
                max: null,
                label: `${end}% and up`
            })
        }

        return ranges
    }

    const discountRanges = generateDiscountRanges(validDiscounts)
    
    const handleDiscToggle = (range) => {
        const exists = appliedDiscount.map(d => d.label).includes(range.label)
        if (exists) setAppliedDiscount(appliedDiscount.filter(d => d.label !== range.label))
        else setAppliedDiscount([...appliedDiscount, range])
    }

    const removeDisc = (label) => {setAppliedDiscount(appliedDiscount.filter(d => d.label !== label))}

    return (
        <div className="space-y-2 max-h-[180px] overflow-y-auto">
            <div className="space-y-2">
                {discountRanges.map((range, i) => {
                    const isSelected = appliedDiscount.map(d => d.label).includes(range.label)
                    return (
                        <div key={i} className="flex items-center justify-start space-x-2">
                            <div onClick={() => handleDiscToggle(range)} className="flex items-center space-x-3 cursor-pointer">
                                {isSelected ? <IoIosCheckmarkCircleOutline /> : <MdOutlineRadioButtonUnchecked />}
                                <span className={`text-sm ${isSelected ? "text-gray-400" : "text-black"}`}>
                                    {range.label}
                                </span>
                            </div>
                            {isSelected && (
                                <button onClick={() => removeDisc(range.label)} className="cursor-pointer">
                                    <IoMdClose />
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default DiscountFilter