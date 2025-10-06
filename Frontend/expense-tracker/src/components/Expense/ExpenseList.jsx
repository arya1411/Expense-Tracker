import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
    const list = Array.isArray(transactions)
        ? transactions
        : Array.isArray(transactions?.data)
        ? transactions.data
        : Array.isArray(transactions?.items)
        ? transactions.items
        : Array.isArray(transactions?.results)
        ? transactions.results
        : [];

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg text-white font-semibold">All Expense</h5>

                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> Download
                </button>
            </div>
            {list.length === 0 ? (
                <p className="text-sm text-gray-400 mt-3">No expense records found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {list.map((expense) => (
                        <TransactionInfoCard
                            key={expense._id}
                            title={expense.category}
                            icon={expense.icon}
                            date={moment(expense.date).format("Do MMM YYYY")}
                            amount={expense.amount}
                            type="expense"
                            onDelete={() => onDelete(expense._id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpenseList;