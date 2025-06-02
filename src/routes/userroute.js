import express from "express"
const routers = express.Router();
import usercontroller from "../controller/usercontroller.js";
import varifyjwt from "../middleware/authmiddleware.js"

routers.post('/user',usercontroller.createuser);
routers.post('/login',usercontroller.loginuser);
routers.get('/logout',varifyjwt,usercontroller.logout);

export default routers ;

