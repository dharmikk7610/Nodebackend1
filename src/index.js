// require('dotenv').config({path:'./env'})
// import  { Mongoose }  from "mongoose";
// require Mongoos from 'mongoose' ;
import mongoose, { Mongoose } from "mongoose";
// import { DB_NAME } from "./constants.js";
import DB_CONNECTION from "./db/index.js";
import express from "express" ;
import dotenv from 'dotenv' ;
import app from "./app.js" ;
import cookieParser from "cookie-parser" ;
import userroute from "./routes/userroute.js" ;
import userController from './controller/usercontroller.js'
dotenv.config({ path: './env' }) ;
const port = 4000 ;
app.use(express.json()) ;
app.use('/user',userroute) ;
// console.log("MONGODB_URL = ", process.env.MONGODB_URL);
app.use(cookieParser())

//jwt ..>
const { refreshaccesstoken } = userController;
app.post("/auth/accesstoken",refreshaccesstoken);

mongoose.connect('mongodb://127.0.0.1:27017/mytube').then(()=>{
  console.log("db connected sucessfully");
  
})
.catch((err)=>{
  console.log("saw the error indb connection..!!");
  
})


  app.listen(port , ()=>{
    console.log(`server start at port ${port}`);
    
  })
// })
// .catch((err)=>{
//   console.log("error in server ..",err);
  
// })




//connect data_base mannually 
/*
import express from "express"
const app = express()

(async()=>{
    try {
      await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        
      app.listen(process.env.PORT,()=>{
        console.log("server started ..");
        
      })
    } catch (error) {
        console.log("ERROR" ,Error);
        
    }
})()
    */
   