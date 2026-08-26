const express=require("express");
const mongoose=require("mongoose");
const { randomUUID } = require("crypto");
const { authMiddleware } = require("../middlware/authMiddleware");
const { Account }=require("../config/bankschema");
const { Transaction } = require("../config/userschema");
const zod=require("zod");

const router= express.Router();

router.get("/balance",authMiddleware,async(req,res)=>{
    const account = await Account.findOne({
        userId:req.userId
    })

    res.json({
        balance:account.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const parsedBody = zod.object({
            to: zod.string().refine((value) => mongoose.Types.ObjectId.isValid(value)),
            amount: zod.coerce.number().finite().positive(),
        }).safeParse(req.body);

        if (!parsedBody.success) {
            return res.status(400).json({ msg: "Enter a valid recipient and amount" });
        }

        const { amount, to } = parsedBody.data;

        if (String(req.userId) === to) {
            return res.status(400).json({ msg: "You cannot transfer money to yourself" });
        }

        const recipient = await Account.findOne({ userId: to });

        if (!recipient) {
            return res.status(404).json({ msg: "The recipient account does not exist" });
        }

        const account = await Account.findOneAndUpdate(
            { userId: req.userId, balance: { $gte: amount } },
            { $inc: { balance: -amount } },
            { new: true }
        );

        if (!account) {
            return res.status(400).json({ msg: "Insufficient Balance" });
        }

        try {
            const updatedRecipient = await Account.findOneAndUpdate(
                { userId: to },
                { $inc: { balance: amount } },
                { new: true }
            );

            if (!updatedRecipient) {
                throw new Error("Recipient account disappeared during transfer");
            }

            recipient.balance = updatedRecipient.balance;
        } catch (error) {
            await Account.updateOne(
                { userId: req.userId },
                { $inc: { balance: amount } }
            );
            throw error;
        }

        const transferId = randomUUID();
        try {
            await Transaction.insertMany([
                {
                    userId: req.userId,
                    type: "Debit",
                    amount,
                    balance: account.balance,
                    counterpartyId: to,
                    transferId,
                },
                {
                    userId: to,
                    type: "Credit",
                    amount,
                    balance: recipient.balance + amount,
                    counterpartyId: req.userId,
                    transferId,
                },
            ]);
        } catch (error) {
            await Account.updateOne(
                { userId: req.userId },
                { $inc: { balance: amount } }
            );
            await Account.updateOne(
                { userId: to },
                { $inc: { balance: -amount } }
            );
            throw error;
        }

        res.json({ msg: "Transfer successful!", amount, to });

    } catch (error) {
        console.error("Transfer error:", error);
        res.status(500).json({ msg: "Server error" });
    }
});


module.exports=router;