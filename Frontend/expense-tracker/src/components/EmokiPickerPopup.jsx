import React, { useState } from "react"
import EmojiPicker from 'emoji-picker-react'
import {LuImage , LuX} from "react-icons/lu"

const EmokiPickerPopup = ({ icon, onSelect }) =>{
    const [isOpen , setIsOpen ] = useState(false)

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div className="flex items-center gap-4 cursor-pointer"
                onClick={()=> setIsOpen(true)}
            >
            <div className="w-12 h-12 flex items-center justify-center text-2xl bg-white/10 text-purple-400 rounded-lg">
                {icon ? (
                    <img src={icon} alt="Icon" className="w-12 h-12" />
                ) : (
                    <LuImage />
                )}
                </div>
                <p className="text-gray-300">{icon ? "Change Icon" : "Pick Icon" }</p>
            </div>
            {isOpen && (
                <div className="relative">
                    <button
                        className="w-7 h-7 flex items-center justify-center bg-[#1a1a24] border border-white/20 text-gray-300 hover:text-white rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
                        onClick={()=>setIsOpen(false)}
                    >
                    <LuX/>
                    </button>
                    <EmojiPicker
                        open= {isOpen}
                        onEmojiClick={(emoji )=>{
                            if (typeof onSelect === 'function') {
                                onSelect(emoji?.imageUrl || emoji?.emoji || "");
                            }
                        }}
                    />
                </div>
            )}
        </div>
    )
}


export default EmokiPickerPopup;