import jwt from "jsonwebtoken"
// import accessToken from "../utils/jwtAuth.js"
import User from "../models/user.js"
import { configDotenv } from "dotenv";
const accessToken = "royal";

const varifyjwt = async (req, res, next) => {

  try {
    console.log(req.headers);
    console.log(req.cookies);


    // const token = req.cookies?.accesstoken || req.headers["authorization"]?.replace("Bearer ", "")
         var token = req.headers.authorization; //Bearer token
    if(token){
        if(token.startsWith("Bearer ")){

            token  = token.split(" ")[1]
        }}
    if (!token) {
      return res.status(401).json({ error: "Access token not provided" });
    }
    const decodetoken = jwt.verify(token, process.env.ACCESSSECRECTKEY);
    console.log("decodetoken",decodetoken);
    

    const user1 = await User.findById(decodetoken?._id);
    
    if (!user1) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user1 = user1;
    next()

  } catch (error) {
    console.log("error here..", error);

  }
}
export default varifyjwt;