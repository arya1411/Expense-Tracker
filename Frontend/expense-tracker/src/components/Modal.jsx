import React, { useEffect, useCallback } from "react"

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-labelledby="modal-title"
            onClick={onClose}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full" onClick={(e) => e.stopPropagation()}>
                <div className="relative bg-[#1a1a24] rounded-lg shadow-2xl border border-white/10">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-white/10">
                        <h3 id="modal-title" className="text-lg font-semibold text-white">
                            {title}
                        </h3>
                                    <button
                            className="text-gray-400 bg-transparent hover:bg-white/10 hover:text-white rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor-pointer transition-colors"
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1l12 12M13 1L1 13"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal