const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const connectDb= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI),{
            useNewUrlParser:true,
            useUnifiedTopology:true
        };
        console.log("DB connected successfully");
        } catch (error) {
        console.log("Error in DB connection",error);
    }
}

module.exports={
    connectDb
};