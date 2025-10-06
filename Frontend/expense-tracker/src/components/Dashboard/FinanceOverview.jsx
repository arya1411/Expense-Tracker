import React from "react";
import CustomPieChart from '../Charts/CustomPieChart'
const COLORS = ["#875CF5" , "#FA2C37" , "#FF6900"];

const FinanceOverview = ({totalBalance , totalIncome , totalExpense}) =>{
    
    const balanceData = [
        {name : "Total Expenses " , amount : totalExpense},
        {name :  "Total Income "  , amount : totalIncome},
    ];
    
    
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg text-white font-semibold">Financial Overview</h5>
            </div>

            <CustomPieChart
                data = {balanceData}
                label = "total Balance"
                totalAmount = {`$${totalBalance}`}
                colors = {COLORS}
                showTextAnchor
                />
        </div>
    )
}


export default FinanceOverview;