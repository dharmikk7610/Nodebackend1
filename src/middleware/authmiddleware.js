import jwt from "jsonwebtoken"
// import accessToken from "../utils/jwtAuth.js"
import User from "../models/user.js"
import { config, configDotenv } from "dotenv";
config();
const accessToken = "royal";

const varifyjwt = async (req, res, next) => {

  try {
    console.log(req.headers);
    console.log(req.cookies);



    const token = req.cookies?.accesstoken || req.headers["authorization"]?.replace("Bearer ", "")
    //  var token = req.headers.authorization; //Bearer token
    // if(token){
    //     if(token.startsWith("Bearer ")){

    //         token  = token.split(" ")[1]
    //     }}
    if (!token) {
      return res.status(401).json({ error: "Access token not provided" });
    }
    const decodetoken = jwt.verify(token,process.env.ACCESSSECRETKEY);
    console.log("decodetoken-->", decodetoken);


    const user1 = await User.findById(decodetoken?._id);

    if (!user1) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user1 = user1;
    next() 

  } catch (error) {
    console.log("Access token expired, refreshing...", error);
      return res.status(401).json({ error: "Access token expired or invalid" });
    // try {

    //   const refreshaccesstoken = await axios.post("http://localhost:3000/auth/accesstoken", {},
    //     {
    //       headers: {
    //         Cookie: req.headers.cookie
    //       }
    //     }
    //   );
    //   const newaccesstoken = refreshaccesstoken.data.accesstoken;

    //   const decoded = jwt.verify(newaccesstoken, process.env.ACCESSSECRETKEY)
    //   const user1 = await usermodel.findById(decoded._id);
    //   req.user1 = user1;
    //   next();
    // } catch (err) {
    //   return res.status(403).json({ message: " expired. Please login again." });
    // }


  }
}
export default varifyjwt;