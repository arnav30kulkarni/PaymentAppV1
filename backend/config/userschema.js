const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
})

const transactionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    type:{
        type:String,
        enum : ["Credit","Debit"],
        required:true
    },
    amount:{
        type:Number,
        required:true,
        min:0
    },
    balance:{
        type:Number,
        required:true
    },
    counterpartyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    transferId:{
        type:String,
        required:true,
        index:true
    },
    status:{
        type:String,
        enum:["Pending","Completed","Failed"],
        default:"Completed"
    },
}, { timestamps:true });

const Transaction = mongoose.model("Transaction",transactionSchema)
const User=mongoose.model("User",userSchema);

module.exports={
    User,
    Transaction
};
