// src/components/CustomScrollbar.jsx
import React, { useEffect, useRef, useState } from "react"

const CustomScrollbar = ({ children, className = "", parentif }) => {
    const contentRef = useRef(null)
    const [scrollInfo, setScrollInfo] = useState({
        scrollTop: 0,
        scrollHeight: 0,
        clientHeight: 0
    })
    const [isDragging, setIsDragging] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [startY, setStartY] = useState(0)
    const [startScrollTop, setStartScrollTop] = useState(0)

    // Scroll update
    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = contentRef.current
                setScrollInfo({ scrollTop, scrollHeight, clientHeight })
            }
        }

        const content = contentRef.current
        if (content) {
            content.addEventListener("scroll", handleScroll)
            handleScroll()
        }

        return () => {
            if (content) {
                content.removeEventListener("scroll", handleScroll)
            }
        }
    }, [])

    // Drag scrollbar
    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartY(e.clientY)
        setStartScrollTop(scrollInfo.scrollTop)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return

        const delta = e.clientY - startY
        const scrollRatio = scrollInfo.scrollHeight / scrollInfo.clientHeight
        const scrollDelta = delta * scrollRatio

        if (contentRef.current) {
            contentRef.current.scrollTop = startScrollTop + scrollDelta
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("mouseup", handleMouseUp)
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [isDragging])

    // Hover fade
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => {
        if (!isDragging) setIsHovering(false)
    }

    useEffect(() => {
        if (!isDragging && !isHovering) {
            const timer = setTimeout(() => setIsHovering(false), 1000)
            return () => clearTimeout(timer)
        }
    }, [isDragging, isHovering])

    const scrollbarHeight = Math.max(
        (scrollInfo.clientHeight / scrollInfo.scrollHeight) * scrollInfo.clientHeight,
        40
    )
    const scrollbarTop = (scrollInfo.scrollTop / scrollInfo.scrollHeight) * scrollInfo.clientHeight

    return (
        <div
            className={`relative select-none ${parentif === true ? className : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* scrollable content */}
            <div
                ref={contentRef}
                className={`relative isolate w-full h-full overflow-y-auto overflow-x-hidden hide-scrollbar  ${className}`}
            >
                {children}
            </div>

            {/* custom scrollbar */}
            {scrollInfo.scrollHeight > scrollInfo.clientHeight && (
                <div
                    className="absolute right-2 top-0 w-[8px] h-full pointer-events-none select-none"
                    style={{
                        opacity: isDragging || isHovering ? 1 : 0,
                        transition: "opacity 0.3s ease"
                    }}
                >
                    <div
                        className="absolute w-full pointer-events-auto select-none"
                        style={{
                            height: `${scrollbarHeight}px`,
                            transform: `translateY(${scrollbarTop}px)`,
                            transition: isDragging ? "none" : "all 0.2s ease",
                            background:
                                "linear-gradient(135deg, rgba(103, 80, 164, 0.08), rgba(103, 80, 164, 0.12))",
                            borderRadius: "8px",
                            backdropFilter: "blur(4px)",
                            boxShadow:
                                isDragging || isHovering
                                    ? "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14), inset 0 0 0 1px rgba(103, 80, 164, 0.2)"
                                    : "none",
                            cursor: "pointer"
                        }}
                        onMouseDown={handleMouseDown}
                    />
                </div>
            )}
        </div>
    )
}

export default CustomScrollbar
