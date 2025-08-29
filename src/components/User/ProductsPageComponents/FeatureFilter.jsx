import React from 'react'
import { IoIosCheckmarkCircleOutline, IoMdClose } from 'react-icons/io'
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md'

const FeatureFilter = ({availableFeatures, appliedFeatures, setAppliedFeatures}) => {
    const handleFeatureToggle = (feature) => {
        if (appliedFeatures.includes(feature)) setAppliedFeatures(appliedFeatures.filter(f => f !== feature))
        else setAppliedFeatures([...appliedFeatures, feature])
    }

    const removeFeature = (feature) => {setAppliedFeatures(appliedFeatures.filter(f => f !== feature))}

    return (
        <div className="space-y-2 max-h-[180px] overflow-y-auto">
            <div className="space-y-2">
                {availableFeatures.map((feature) => {
                    const isSelected = appliedFeatures.includes(feature)

                    return (
                        <div key={feature} className="flex items-center justify-start space-x-2">
                            <div onClick={() => handleFeatureToggle(feature)} className="flex items-center space-x-3 cursor-pointer">
                                {isSelected ? <IoIosCheckmarkCircleOutline /> : <MdOutlineRadioButtonUnchecked />}
                                <span className={`text-sm ${isSelected ? "text-gray-400" : "text-black"}`}>
                                    {feature}
                                </span>
                            </div>

                            {isSelected && <button onClick={() => removeFeature(feature)} className="cursor-pointer"><IoMdClose /></button>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FeatureFilter