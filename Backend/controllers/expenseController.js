const xlsx = require('xlsx');
const Expense = require("../models/Expense");

exports.addExpense = async (req , res ) =>{
    const userId = req.user.id;

    try {
        const {icon , category , amount , date } = req.body;
        
        if(!category || !amount  || !date){
            return res.status(400).json({message : "ALL of fields are required "});
        }

        const newExpense = new Expense ({
            userId,
            icon,
            category,
            amount,
            date : Date.now()
        });
        await newExpense.save();
        res.status(200).json(newExpense);    
    } catch (error) {
        res.status(500).json({message : "Server Errror"})
    }
}

exports.getAllExpense = async (req, res) =>{
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date : -1});
        res.json(expense)
    } catch (err) {
        res.status(500).json({message: "Server Error"})
    }
}

exports.downloadExpensexcel = async (req ,res ) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({userId}).sort({date : -1});

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb , ws , "expense");
        const filename = 'expense_details.xlsx';
        xlsx.writeFile(wb , filename);
        res.download(filename);
    } catch (error){
        res.status(500).json({message : "Server Error"});
    }
};


exports.deleteExpense = async (req , res ) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message : "Expense Deleted Succefully"});
    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
}