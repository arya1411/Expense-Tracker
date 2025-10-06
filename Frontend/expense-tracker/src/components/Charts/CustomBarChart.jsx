import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomBarChart = ({ data = [], xKey, yKey = "amount", showTooltip = true }) => {
    const resolvedXKey = xKey || (data?.[0]?.month ? "month" : "category");

    const getBarColor = (index) => (index % 2 === 0 ? "#875cf5" : "#cfbefb");

    if (!data || data.length === 0) {
        return (
            <div className="bg-white/5 mt-6 text-sm text-gray-400 p-4 rounded-lg border border-white/10">
                No data to display.
            </div>
        );
    }

    return (
        <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    <XAxis
                        dataKey={resolvedXKey}
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        stroke="none"
                    />
                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} stroke="none" />

                    {showTooltip && <Tooltip content={(props) => <CustomTooltip {...props} />} />}
                    <Bar dataKey={yKey} fill="#ff8042" radius={[10, 10, 0, 0]}>
                        {(data || []).map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;