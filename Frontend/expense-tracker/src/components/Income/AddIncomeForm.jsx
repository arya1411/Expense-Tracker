import { useState } from "react";
import Input from "../inputs/input";
import EmokiPickerPopup from "../EmokiPickerPopup";
const AddIncomeForm =  ({onAddIncome}) => {
    const [income , setIncome ] = useState({
        source : "",
        amount: "",
        date : "",
        icon : "",
    });

    const handleChange = (key , value) => setIncome({...income , [key]: value});
     return (
        <div>
            <EmokiPickerPopup
                icon = {income.icon}
                onSelect = {(selectedIcon) => handleChange("icon" , selectedIcon)}
            />
        <Input
            value={income.source}
            onChange={(val) => handleChange("source", val)}
            label = "Income Source"
            placeholder  = "FreeLancing , salary etc"
             type = 'text'
        />
        <Input
            value = {income.amount}
            onChange = {(val) => handleChange("amount" , val)}
            label = "Amount"
            placeholder = ""
            type = "number"
        />

        <Input
            value = {income.date}
            onChange = {(val) => handleChange("date" , val)}
            label = "date"
            placeholder = ""
            type = 'date'
        />
        <div className="flex justify-end mt-6">
            <button
                type="button"
                className="add-btn add-btn-fill"
                onClick={()=> onAddIncome(income)}
            >
        Add Income
        </button>
        </div> 
        </div>
     )
}

export default AddIncomeForm ;  