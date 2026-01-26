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

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session = await Account.startSession();
    const {amount,to} = req.body;

    const account= await Account.findOne({
        userId:req.userId
    }).session(session);

    if(!account|| account.balance<amount){
        await session.abortTransaction();
        res.json({
            msg:"Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({
        userId:to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        res.json({
            msg:"The recipient account does not exist"
        })
    }

    await Acccount.updateOne({
        userId:req.userId
    },{
        $inc:{
            balance:-amount
        }
    }).session(session);

    await Account.updateOne({
        userId:to
    },{
        $ince:{
            balance:amount
        }
    }).session(session);

    await session.commitTransaction();
    res.json({
        msg:"Transfer successful!"
    })
})

module.exports=router;