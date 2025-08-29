import { IoIosCheckmarkCircleOutline, IoMdClose } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

const SizeFilter = ({ availableSizes, appliedSizes, setAppliedSizes }) => {
    const handleSizeToggle = (sizeName) => {
        if (appliedSizes.includes(sizeName)) setAppliedSizes(appliedSizes.filter(size => size !== sizeName))
        else setAppliedSizes([...appliedSizes, sizeName])
    }

    const removeSize = (sizeName) => {setAppliedSizes(appliedSizes.filter(size => size !== sizeName))}

    return (
        <div className="space-y-2 max-h-[180px] overflow-y-auto">
            <div className="space-y-2">
                {availableSizes.map((size) => {
                    const isSelected = appliedSizes.includes(size)

                    return (
                        <div key={size} className="flex items-center justify-start space-x-2">
                            <div onClick={() => handleSizeToggle(size)} className="flex items-center space-x-3 cursor-pointer">
                                {isSelected ? <IoIosCheckmarkCircleOutline /> : <MdOutlineRadioButtonUnchecked />}
                                <span className={`text-sm ${isSelected ? "text-gray-400" : "text-black"}`}>
                                    {size}
                                </span>
                            </div>

                            {isSelected && <button onClick={() => removeSize(size)} className="cursor-pointer"><IoMdClose /></button>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SizeFilter;