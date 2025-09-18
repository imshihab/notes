import React from "react"
import { useNavigate } from "react-router"
import { set } from "esmls"
import { iconOptions } from "./IconColor"

const FolderButton = ({ folder, isFirst, isLast, isSingle, onContextMenu }) => {
    const { name, id, Pinned, icon, color } = folder
    const navigate = useNavigate()

    // Calculate border radius classes based on position
    const getBorderRadiusClass = () => {
        if (isSingle) return "rounded-xl"
        if (isFirst) return "rounded-t-xl rounded-b-[6px]"
        if (isLast) return "rounded-b-xl rounded-t-[6px]"
        return "rounded-[6px]"
    }

    const { icon: Icon } =
        iconOptions.find((opt) => opt.id === icon) ||
        iconOptions.find((opt) => opt.id === "default")

    return (
        <button
            id={`Folder_${id}`}
            onClick={() => {
                set("isActive", { name: name, uid: id })
                navigate(`/Folder/${id}`)
            }}
            className={`all-unset cursor-pointer w-full px-3 pr-3 h-16 text-base font-normal font-[Helvetica Neue] flex items-center transition-colors duration-300 bg-white hover:bg-[#e4e4e47e] ${getBorderRadiusClass()}`}
            onContextMenu={onContextMenu}
        >
            <div className="flex items-center w-full gap-3 min-w-0 flex-1 min-[inline-size:1px]">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-[#E8E8E8] rounded-xl">
                    <Icon size="24" color={color} />
                </span>
                <span className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden text-left text-[#1B1B1B] text-[16px] leading-[22px] font-[system-ui] font-normal">
                    {name}
                </span>
                {Pinned ? (
                    <svg
                        viewBox="0 0 24 24"
                        fill="#fbbc04"
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                    </svg>
                ) : (
                    ""
                )}
            </div>
        </button>
    )
}

export default FolderButton
