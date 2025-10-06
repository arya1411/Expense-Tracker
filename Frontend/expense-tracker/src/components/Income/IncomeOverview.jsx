import React, { useEffect , useState} from "react"
import { LuPlus } from "react-icons/lu"
import { prepareIncomeBarChartData } from "../../utils/helper"
import CustomBarChart from "../Charts/CustomBarChart"

const IncomeOverview = ({transactions  , onAddIncome}) => {
    const [chartData , setChartData ] = useState([])


    useEffect(()=>{
    const result  = prepareIncomeBarChartData(transactions)
    setChartData(result);

        return () =>{};
    } , [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between ">
                <div className="">
                <h5 className="text-lg text-white font-semibold"> Income Overview </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track Your Earnings over time and analyze your expense
                    </p>
            </div>
            <button  className="add-btn" onClick={onAddIncome}>
                <LuPlus className="text-lg"/>
                Add Income
            </button>
        </div>

        <div className="mt-10">
            <CustomBarChart data={chartData} xKey="month" showTooltip={false} />
        </div>
        </div>
    )

}


export default IncomeOverview