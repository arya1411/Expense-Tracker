import React, { useEffect, useState } from "react"
import DashboardLayout from '../../components/layout/DashboardLayout'
import IncomeOverview from "../../components/Income/IncomeOverview"
import axiosInstance from "../../utils/axoisInstance";
import { API_PATH } from "../../utils/apiPath";
import { useUserAuth } from "../../hooks/useUserAuth"
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
const Income = () => {
    useUserAuth();
    const [incomeData , setIncomeData ] = useState([]);
    const [loading , setloading ] = useState(false);
    const [openDeleteAlert , setOpenDeleteAlert] = useState({
        show : false,
        data : null,
    })
    const [openAddIncomeModal , setopenAddIncomeModal ]  = useState(false);

    // responsible for fetching income details
    const fetchIncomeDetails = async () =>{
        if( loading ) return ;
        
        setloading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATH.INCOME.GET_ALL_INCOME}`
            );
            if(response.data ){
                setIncomeData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong , PLease try again " , error)
        } finally {
            setloading(false);
        }
    };
    // responsible for handling or we can entering a income
    const handleAddIncome = async (income) =>{
        const {source , amount  , date ,icon } = income;
        if(!source.trim()){
            toast.error("Source is Required");
            return ;
        }
        if(!amount || isNaN(amount) || Number(amount) <= 0){
            toast.error('Amount Should be Valid and greater than 0');
            return ;
        }

        if(!date){
            toast.error("Date is required");
            return ;
        }

        try {
            await axiosInstance.post(API_PATH.INCOME.ADD_INCOME , {
                source,
                amount,
                date,
                icon,
            });

            setopenAddIncomeModal(false)
            toast.success("Income Added Succesfully");
            fetchIncomeDetails();
        } catch (error) {
            console.error(
                "Error Addinng Income :",
                error.response?.data?.message || error.message
            );
        }

    };
    
    // responsible for delete income
    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id))
            setOpenDeleteAlert({show:false , data : null});
            toast.success("Income Deleted Successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.error(
                "Error Deleteing Income",
                error.response?.data?.message || error.message
            );
        }
    };
     
    // responsible for download excel sheet of income 
    const handleDownloadIncomeDetails = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATH.EXPENSE.DOWNLOAD_INCOME,
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Expense_Details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error Download Income Details ", error);
            toast.error("Failed to download Income details. Please try again later.");
        }
    };


    useEffect(() => {
        fetchIncomeDetails();
        return () => {};
    }, []);
    
    return (
        <DashboardLayout activeMenu = 'Income'>
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setopenAddIncomeModal(true)}
                        />
                    </div>

                <IncomeList
                    transactions={incomeData}
                    onDelete={(id) => {
                        setOpenDeleteAlert({ show: true, data: id })
                    }}
                    onDownload={handleDownloadIncomeDetails}
                />
                </div>

                <Modal
                    isOpen = {openAddIncomeModal}
                    onClose = {() => setopenAddIncomeModal(false)}
                    title = "Add Income"
                    >
                    <AddIncomeForm onAddIncome = {handleAddIncome} />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={()=> setOpenDeleteAlert({show : false , data : null})}
                    title="Delete Income"
                    >
                    <DeleteAlert
                        content = "Are You sure you want to delete this incomee"
                        onDelete={() => deleteIncome(openDeleteAlert.data)}
                    />
                    </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Income