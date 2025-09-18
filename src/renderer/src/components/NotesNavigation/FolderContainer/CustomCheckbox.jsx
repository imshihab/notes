import React, { useState, memo, useCallback } from "react"

const CustomCheckbox = memo(({ id, checked, onChange, label, description, className = "" }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const handleFocus = useCallback(() => setIsFocused(true), [])
    const handleBlur = useCallback(() => setIsFocused(false), [])
    const handleMouseEnter = useCallback(() => setIsHovered(true), [])
    const handleMouseLeave = useCallback(() => setIsHovered(false), [])
    const handleChange = useCallback((e) => onChange(e.target.checked), [onChange])

    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 rounded-bl-2xl rounded-br-2xl rounded-tl-sm rounded-tr-sm bg-white ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative flex items-center justify-center">
                {/* Ripple Effect Container */}
                <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        checked ? "bg-red-100 scale-0" : ""
                    } ${isHovered ? "scale-150 opacity-20 bg-red-200" : "scale-100 opacity-0"}`}
                />

                {/* Custom Checkbox */}
                <input
                    type="checkbox"
                    id={id}
                    aria-describedby={description}
                    checked={checked}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="peer sr-only peer-focus-visible:opacity-20 peer-focus-visible:scale-150"
                />

                <label
                    htmlFor={id}
                    className={`relative flex items-center justify-center w-5 h-5 cursor-pointer border-2 rounded transition-all duration-200 ${
                        checked
                            ? "bg-red-600 border-red-600"
                            : "bg-white border-gray-400 hover:border-gray-600"
                    } ${isFocused ? "ring-2 ring-offset-2 ring-red-500" : ""} `}
                >
                    {/* Checkmark Icon */}
                    <svg
                        className={`w-3 h-3 text-white transition-all duration-200 ${
                            checked ? "opacity-100 scale-100" : "opacity-0 scale-0"
                        }`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M5 13l4 4L19 7"></path>
                    </svg>
                </label>
            </div>

            <label
                htmlFor={id}
                className="text-sm text-gray-700 cursor-pointer select-none leading-6"
            >
                {label}
            </label>
        </div>
    )
})

export default CustomCheckbox
