import jwt from  "jsonwebtoken" ;
import { configDotenv } from "dotenv";
const secrect_key = "royal1";
const expiretoken ="30d";

const generaterefreshtoken = (_id)=>{
 return    jwt.sign({_id},process.env.REFRESHSECRECTKEY,{expiresIn:expiretoken})
}

export default generaterefreshtoken ;