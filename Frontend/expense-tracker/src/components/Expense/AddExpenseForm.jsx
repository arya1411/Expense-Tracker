import React, { useState } from "react";
import Input from "../inputs/input";
import EmokiPickerPopup from "../EmokiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setExpense((prev) => ({ ...prev, [key]: value }));

    return (
        <div>
            <EmokiPickerPopup icon={expense.icon} onSelect={(val) => handleChange("icon", val)} />

            <Input
                value={expense.category}
                onChange={(val) => handleChange("category", val)}
                label="Category"
                placeholder="Rent, Groceries, etc"
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={(val) => handleChange("amount", val)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={expense.date}
                onChange={(val) => handleChange("date", val)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    className="add-btn add-btn-fill"
                    type="button"
                    onClick={() => onAddExpense(expense)}
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;