//dependencies
const express=require('express');
const dotenv=require("dotenv").config();
const mainRouter=require("./routes/index");
const {connectDb}=require("./config/connectDb");
const jwt=require("jsonwebtoken");
const cors=require("cors");

const app=express();
const PORT=process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);

//mongoDB connection
if(connectDb()){
    console.log("DB connected! succsessfully");
}else{
    console.log("DB connection failed!");
}

app.listen(PORT,()=>{
    console.log("Server running at PORT!");
});

