//dependencies
const express=require('express');
const dotenv=require("dotenv").config();
const mainRouter=require("./routes/mainRouter");
const connectDb=require("./config/connectDb");
const jwt=require("jsonwebtoken");
const cors=require("cors");

const app=express();
const PORT=process.env.PORT || 3000;

//middlewares
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());
app.use("/api/v1",mainRouter);

//mongoDB connection
const startServer=async()=>{
    await connectDb();
}
startServer();

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}!`);
});

