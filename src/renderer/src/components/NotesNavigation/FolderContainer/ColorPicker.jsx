import React from "react"
import { material3Colors as colorOptions } from "./IconColor"

const ColorPicker = ({ selectedColor, setSelectedColor }) => {
    return (
        <div>
            <div className="flex gap-2 flex-wrap mt-2">
                {colorOptions.map((c) => {
                    const isSelected = selectedColor === c
                    return (
                        <button
                            key={c}
                            type="button"
                            className="w-8 h-8 rounded-full transition"
                            style={{
                                backgroundColor: c,
                                boxShadow: isSelected
                                    ? `inset 0 0 0 2px ${c}, inset 0 0 0 4px white`
                                    : "none"
                            }}
                            onClick={() => setSelectedColor(c)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ColorPicker
