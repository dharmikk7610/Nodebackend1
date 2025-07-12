import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
// import app from "/app";
import userroute from './src/Routes/userroutes.js' ;
const app = express()
app.use(cookieParser());
const port = 4000
dotenv.config({ path: './env' });
app.use(express.json());

app.use('/users',userroute)

mongoose.connect('mongodb://127.0.0.1:27017/mysignup').then(()=>{
    console.log("db connected sucessfully");
    
})
.catch((err)=>{
    console.log("error is db ",err);
    
})
// app.listen(process.env.PORT,()=>{
//     console.log(`server start AT ${process.env.PORT}`);
    
// })
app.listen(port,()=>{
    console.log("server start at ",port);
    
})

app.get('/', (req, res) => {
    res.send("Hello friend");
});