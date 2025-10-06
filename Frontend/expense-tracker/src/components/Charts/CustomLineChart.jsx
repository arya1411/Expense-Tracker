import React from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";

const CustomLineChart = ({ data = [] }) => {
    const CustomToolTip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0]?.payload || {};
            const label = item.month || item.category || "";
            const amount = item.amount ?? "";
            return (
                <div className="bg-[#1a1a24] shadow-md rounded-lg p-2 border border-white/10">
                    <p className="text-xs font-semibold text-purple-400 mb-1">{label}</p>
                    <p className="text-xs text-gray-300">
                        Amount: <span className="font-medium">${amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} stroke="none" />
                    <Tooltip content={<CustomToolTip />} />

                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#875cf5"
                        fill="url(#incomeGradient)"
                        strokeWidth={3}
                        dot={{ r: 3, fill: "#ab8df8" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;