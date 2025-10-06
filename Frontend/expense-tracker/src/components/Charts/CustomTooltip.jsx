import React from "react";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1a1a24] shadow-md rounded-lg p-2 border border-white/10">
                <p className="text-xs font-semibold text-purple-400 mb-1">{payload[0].name}</p>
                <p className="text-sm text-gray-300">
                    Amount: <span className="text-sm font-medium text-white">${payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;