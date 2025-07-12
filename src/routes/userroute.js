import express from "express"
const routers = express.Router();
import usercontroller from "../controller/usercontroller.js";
import varifyjwt from "../middleware/authmiddleware.js"
import Uploadfile from "../controller/Uploadfile.js" ;
import uploadFile from '../middleware/multermiddleware.js'

routers.post('/user',uploadFile,usercontroller.createuser);
routers.get('/getalluser',varifyjwt,usercontroller.getUser)
routers.post('/login',usercontroller.loginuser);
routers.get('/logout',varifyjwt,usercontroller.logout);
routers.get('/refreshat',usercontroller.refreshaccesstoken);
routers.post('/profile',usercontroller.getUserChanalProfile);
// routers.post('/upload',Uploadfile.uploadFile);
export default routers ;

