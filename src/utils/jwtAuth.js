import jwt from "jsonwebtoken" ;
import { configDotenv } from "dotenv";
const secrect_key = "royal" ;
const expiretoken = "1d" ;

const generatetoken = (_id)=>{
   return  jwt.sign({_id},process.env.ACCESSSECRECTKEY,{expiresIn:expiretoken});
}
export default generatetoken ;
