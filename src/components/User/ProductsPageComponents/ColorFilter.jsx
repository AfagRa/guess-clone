import { IoMdClose } from "react-icons/io";

const ColorFilter = ({colors, availableColors, appliedColors, setAppliedColors}) => {

    const handleColorToggle = (colorName) => {
        if (appliedColors.includes(colorName)) setAppliedColors(appliedColors.filter(color => color != colorName))
        else setAppliedColors([...appliedColors, colorName])
    }

    const removeColor = (colorName) => { setAppliedColors(appliedColors.filter(color => color !== colorName))}

    return (
        <div className="space-y-2 max-h-[180px] overflow-y-auto">
            <div className="space-y-2">
                {availableColors.map((colorName) => {
                    const color = colors.find((c) => c.name.toLowerCase() === colorName.toLowerCase())
                    const hex = color ? color.hex : colorName

                    const isSelected = appliedColors.includes(colorName)
                    
                    return (
                        <div key={colorName} className="flex items-center justify-start space-x-2">
                            <div 
                                className="flex items-center space-x-3 cursor-pointer"
                                onClick={() => handleColorToggle(colorName)}
                            >
                                <div className="relative">
                                    <div
                                    className={`w-5 h-5 rounded-full border-2 ${
                                        isSelected ? "border-black" : "border-gray-300"
                                    }`}
                                    style={{ background: hex }}
                                    />
                                </div>
                                <span className={`text-sm ${isSelected ? 'text-gray-400' : 'text-black'}`}>
                                    {colorName}
                                </span>
                            </div>

                            {isSelected && (<button onClick={() => {removeColor(colorName)}} className="cursor-pointer"><IoMdClose /></button>)}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ColorFilter