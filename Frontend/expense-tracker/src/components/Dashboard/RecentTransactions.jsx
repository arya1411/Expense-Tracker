import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
const RecentTransactions = ({transactions , seeMore}) =>  {
    console.log('RecentTransactions - transactions:', transactions);
    console.log('RecentTransactions - seeMore:', seeMore);
    
    return (
        <div className="card">
            <div className="flex items-center justify-between w-full">
                <h5 className="text-lg text-white font-semibold">Recent Transactions</h5>
                <button className="card-btn" onClick={seeMore}>
                    See All <LuArrowRight className = 'text-base'/>
                </button>
            </div>
            <div className="mt-6">
                {transactions && transactions.length > 0 ? (
                    transactions.slice(0,5).map((item) => (
                        <TransactionInfoCard
                            key = {item._id}
                            title = {item.type === 'expense' ? item.category : item.source}
                            icon = {item.icon}
                            date = {new Date(item.date).toLocaleDateString()}
                            amount = {item.amount}
                            type = {item.type}
                            hideDeleteBtn = {true}
                        />
                    ))
                ) : (
                    <div className="text-center py-4 text-gray-400">
                        <p>No transactions found</p>
                    </div>
                )}
            </div>
        </div>
    )    
}
export default RecentTransactions;