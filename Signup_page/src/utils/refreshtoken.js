// import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken"
import { configDotenv,config } from "dotenv"

config()

const generaterefreshToken = (_id)=>
{
  return   jwt.sign({_id},process.env.REFRESHTOKENKEY,{expiresIn:30*30*30*30})
}

export default generaterefreshToken