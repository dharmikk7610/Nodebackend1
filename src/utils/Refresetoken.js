import jwt from  "jsonwebtoken" ;
import { config, configDotenv } from "dotenv";
config();
const secrect_key = "royal1";
const expiretoken ="30d";


const generaterefreshtoken = (_id)=>{
 return    jwt.sign({_id},process.env.REFRESHSECRETKEY,{expiresIn:expiretoken})
}

export default generaterefreshtoken ;