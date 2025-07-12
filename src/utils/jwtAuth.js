import jwt from "jsonwebtoken" ;
import { config, configDotenv } from "dotenv";
config();
const secrect_key = "royal" ;
// const expiretoken = "50" ;


const generatetoken = (_id)=>{
   return  jwt.sign({_id},process.env.ACCESSSECRETKEY,{expiresIn:60});
}
export default generatetoken ;
