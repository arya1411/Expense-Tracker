import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    // Normalize transactions into an array to avoid runtime errors
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
                <h5 className="text-lg text-white font-semibold">Expenses</h5>

                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="mt-6">
                {list.length === 0 ? (
                    <p className="text-sm text-gray-400">No expenses found.</p>
                ) : (
                    list.slice(0, 5).map((expense) => (
                        <TransactionInfoCard
                            key={expense._id}
                            title={expense.category}
                            icon={expense.icon}
                            date={moment(expense.date || expense.createdAt).format("Do MM YYYY")}
                            amount={expense.amount}
                            type="expense"
                            hideDeleteBtn
                        />
                    ))
                )}
            </div>

        </div>
    )

}


export default ExpenseTransactions