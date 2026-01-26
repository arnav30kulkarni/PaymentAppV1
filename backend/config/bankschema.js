const mongoose = require("mongoose");
const User=require("./user");

const bankSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        rewuired:true
    },
    balance:{
        type:Number,
        required:true,
    }
});

const Account = mongoose.model("Account",bankSchema);

module.exports = Account;