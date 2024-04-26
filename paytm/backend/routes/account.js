import { Router } from "express";
import { Account } from "../db.js";
import { authMiddleware } from "../middlewares/auth.js";
import mongoose from "mongoose";

const accountRouter = Router();

// Get Account Balance
accountRouter.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const account = await Account.findOne({ userId });
    if (!account) {
        return res.status(404).json({ error: "Account not found" });
    }
    res.json({ balance: account.balance });
});

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const sesssion = await mongoose.startSession();    // Create a new session
    // By creating a new session, we can perform multiple operations in a single transaction and commit them all at once If any operation fails, we can rollback the entire transaction
    sesssion.startTransaction();                       // Start a new session
    const userId = req.userId;
    const { to, amount } = req.body;
    if (!to || !amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid Inputs" });
    }

    const fromAccount = await Account.findOne({ userId }, { session: sesssion });
    const toAccount = await Account.findOne({ userId: to }, { session: sesssion });

    if (!fromAccount || !toAccount) {
        return res.status(404).json({ error: "Account not found" });
    }

    if (fromAccount.balance < amount) {
        return res.status(400).json({ error: "Insufficient Balance" });
    }

    await Account.updateOne({ userId }, { $inc: { balance: -amount } }, { session: sesssion });  // Deduct amount from sender's account
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }, { session: sesssion }); // Add amount to receiver's account

    await sesssion.commitTransaction();    // Commit the transaction

    res.json({ message: "Transfer Successful" });
})

export default accountRouter;