// require('dotenv').config({path:'./env'})
// import  { Mongoose }  from "mongoose";
// require Mongoos from 'mongoose' ;
import { Mongoose } from "mongoose";
import { DB_NAME } from "./constants.js";
import DB_CONNECTION from "./db/index.js";

import dotenv from 'dotenv';
import app from "./app.js";
dotenv.config({ path: './env' });

//console.log("MONGODB_URL = ", process.env.MONGODB_URL);



DB_CONNECTION()
.then(()=>{
  app.listen(process.env.PORT , ()=>{
    console.log(`server start at port ${process.env.PORT}`);
    
  })
})
.catch((err)=>{
  console.log("error in server ..",err);
  
})




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
   