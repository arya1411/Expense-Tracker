const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Get total income
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Get total expense
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Get last 60 days income transactions
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // Calculate total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get last 30 days expense transactions
        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // Calculate total expense for last 30 days
        const expenseLast30Days = last30DaysExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get last 5 income transactions
        const lastIncomeTransactions = await Income.find({ userId })
            .sort({ date: -1 })
            .limit(5);

        // Get last 5 expense transactions
        const lastExpenseTransactions = await Expense.find({ userId })
            .sort({ date: -1 })
            .limit(5);

        // Combine and sort recent transactions
        const lastTransaction = [
            ...lastIncomeTransactions.map((txn) => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...lastExpenseTransactions.map((txn) => ({
                ...txn.toObject(),
                type: "expense",
            }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30Expense: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransaction,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransaction,
        });
    } catch (error) {
        console.error("Dashboard data error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};