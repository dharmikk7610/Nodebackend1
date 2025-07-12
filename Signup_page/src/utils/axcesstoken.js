import jwt from "jsonwebtoken";
import { configDotenv,config } from "dotenv";

config();

const generateaccessToken = (_id)=>{
    return jwt.sign({_id},process.env.ACCESSTOKENKEY,{expiresIn:60})
}
export default generateaccessToken
