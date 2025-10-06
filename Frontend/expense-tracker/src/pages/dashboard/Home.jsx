import DashboardLayout from "../../components/layout/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axoisInstance";
import { API_PATH } from "../../utils/apiPath";
import { useEffect, useState } from "react";
import { LuHandCoins , LuWalletMinimal } from "react-icons/lu";
import {IoMdCard } from 'react-icons/io';
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import IncomeTransactions from "../../components/Dashboard/IncomeTransactions"
const Home = () => {
    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData , setdashboardData ] = useState(null);
    const [loading ,  setloading ] = useState(false);
    const fetchDashboardData = async () => {
        if(loading) return;
        setloading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATH.DASHBOARD.GET_DATA}`
            );
            if(response.data) {
                setdashboardData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong " , error);
        } finally {
            setloading(false);
        }
    };

useEffect(()=>{
    fetchDashboardData();
    return () => {};
}, []);

    return (
        <DashboardLayout activeMenu = 'Dashboard'>
            <div className="my-5 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoCard 
                    icon = {<IoMdCard />}
                    label = "Total Balance"
                    value = {addThousandSeparator(dashboardData?.totalBalance || 0)}
                    color = 'bg-primary'
                    />
                <InfoCard 
                    icon = {<IoMdCard />}
                    label = "Total Income"
                    value = {addThousandSeparator(dashboardData?.totalIncome || 0)}
                    color = 'bg-orange-500'
                    />
                <InfoCard 
                    icon = {<IoMdCard />}
                    label = "Total Expense"
                    value = {addThousandSeparator(dashboardData?.totalExpense || 0)}
                    color = 'bg-red-500'
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <RecentTransactions
                    transactions = {dashboardData?.recentTransactions}
                    seeMore = {() => navigate('/expense')}
                />

                <FinanceOverview
                    totalBalance={dashboardData?.totalBalance || 0}
                    totalIncome={dashboardData?.totalIncome || 0}
                    totalExpense={dashboardData?.totalExpense || 0}
                    />

                <ExpenseTransactions
                    transactions={dashboardData?.last30Expense?.transactions || []}
                    onSeeMore = {() => navigate("/expense")}
                    />
                
                <IncomeTransactions
                    transactions={dashboardData?.last60DaysIncome?.transactions || []}
                    onSeeMore = {() => navigate("/income")}
                    />

               
                </div>
            </div>
        </DashboardLayout>
    )   
}

export default Home