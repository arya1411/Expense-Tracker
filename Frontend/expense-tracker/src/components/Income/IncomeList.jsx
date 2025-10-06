import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
    // Normalize transactions to a safe array to avoid `.map is not a function` errors.
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
            <div className="flex items-center justify-between ">
                <h5 className="text-lg text-white font-semibold">Income Sources</h5>
                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> Download
                </button>
            </div>

            {list.length === 0 ? (
                <p className="text-sm text-gray-400 mt-3">No income records found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {list.map((income) => (
                        <TransactionInfoCard
                            key={income._id}
                            title={income.source}
                            icon={income.icon}
                            date={income?.date ? moment(income.date).format("Do MMM YYYY") : ""}
                            amount={income.amount}
                            type="income"
                            onDelete={() => onDelete(income._id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default IncomeList;