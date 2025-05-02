import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const DB_CONNECTION = async () =>{

    try {
        const data = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\ndatabase connected sucess_fully : ${data.connection.host}`);
        
        
    } catch (error) {
        console.log("error connection failed .." , error);
        // console.log("MongoDB URL:", process.env.MONGODB_URL);

    }
}

export default DB_CONNECTION

