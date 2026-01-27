const express=require("express");
const jwt=require("jsonwebtoken");
const secretkey=process.env.JWT_SECRET;
const { authMiddleware } = require("../middlware/authMiddleware");
const { Account }=require("../config/bankschema");
const zod=require("zod");
const { User } = require("../config/userschema");

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
    const session = await Account.startSession();
    session.startTransaction(); 

    try {
        const { amount, to } = req.body;

        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ msg: "Insufficient Balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ msg: "The recipient account does not exist" });
        }

        
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } } 
        ).session(session);

        
        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } } 
        ).session(session);

        
        await session.commitTransaction();
        session.endSession();

        res.json({ msg: "Transfer successful!" });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});


module.exports=router;