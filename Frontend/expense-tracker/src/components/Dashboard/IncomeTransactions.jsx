import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const IncomeTransactions = ({transactions , onSeeMore}) => {
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
                <h5 className="text-lg text-white font-semibold">Income</h5>

                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>
            
            <div className="mt-6">
                {list.length === 0 ? (
                    <p className="text-sm text-gray-400">No income found.</p>
                ) : (
                    list.slice(0, 5).map((income) => (
                        <TransactionInfoCard
                            key={income._id}
                            title={income.source}
                            icon={income.icon}
                            date={moment(income.date || income.createdAt).format("Do MM YYYY")}
                            amount={income.amount}
                            type="income"
                            hideDeleteBtn
                        />
                    ))
                )}
            </div>

        </div>
    )
}


export default IncomeTransactions;