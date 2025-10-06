import { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth"
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axoisInstance";
import { API_PATH } from "../../utils/apiPath";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";
const Expense = () =>{
    useUserAuth();

    const [expenseData , setExpenseData ] = useState([]);
    const [loading  , setLoading ] = useState(false);
    const [openDeleteAlert , setOpenDeleteAlert] = useState({
        show :false,
        data : null ,
    })
    const [openAddExpenseModal , setOpenAddExpenseModal] = useState(false);



    const fetchExpenseDetails = async () =>{
        if(loading )return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATH.EXPENSE.GET_ALL_EXPENSE}`
            );
            if(response.data ){
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong , please try again ");
        } finally {
            setLoading(false);
        }
    };
    const handleAddExpense = async (expense) =>{
        const {category , amount , date, icon} = expense;
        if(!category.trim()){
            toast.error("Category is required");
            return ;
        }
        if(!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be greater than 0");
            return ;
        }
        if(!date){
            toast.error("Date is Required");
            return;
        }

        try {
            await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE , {
                category,
                amount,
                date,
                icon,
            });

            setOpenAddExpenseModal(false)
            toast.success("Expense Add Successfully");
            fetchExpenseDetails();
        } catch (error){
            console.error (
                "Error Expense Adding" , 
                error.response?.data?.message || error.message
            );
        }
    };

    const deleteExpense = async (id) =>{
        try {
            await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id))
            setOpenDeleteAlert({show :false , data : null});
            toast.success("Expense Deleted Successfully");
            fetchExpenseDetails();
        } catch (error){
            console.error (
                "Error Deleting Expense" ,
                error.response?.data?.message || error.message
            ) ;
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATH.EXPENSE.DOWNLOAD_EXPENSE,
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
            console.error("Error Download Expense Details ", error);
            toast.error("Failed to download expense details. Please try again later.");
        }
    };

    useEffect(()=>{
        fetchExpenseDetails();
        return () =>{}
    } , []);

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                            transactions = {expenseData}
                            onExpenseIncome = {() => setOpenAddExpenseModal(true)}
                            />
                    </div>
                </div>

                <div className="mt-6">
                <ExpenseList
                    transactions={expenseData}
                    onDelete ={(id) => {
                        setOpenDeleteAlert({ show: true, data: id })
                    }}
                    onDownload={handleDownloadExpenseDetails}
                />
                </div>

                <Modal
                isOpen={openAddExpenseModal}
                onClose={()=> setOpenAddExpenseModal(false)}
                title="Add Expense"
                >
                <AddExpenseForm onAddExpense = {handleAddExpense} />
                </Modal>

              <Modal
                   isOpen={openDeleteAlert.show}
                    onClose={()=> setOpenDeleteAlert({show : false , data : null})}
                    title="Delete Expense"
                    >
                    <DeleteAlert
                        content = "Are You sure you want to delete this Expense"
                        onDelete={() => deleteExpense(openDeleteAlert.data)}
                />
                </Modal>





            </div>
        </DashboardLayout>
    );
}

export default Expense