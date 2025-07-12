import express from "express"
const router = express.Router();
import uploadcontroller from "../Controller/Uploadcontroller.js"
import userconroller from '../Controller/Usercontroller.js'


router.post('/upload',uploadcontroller.uploadFile)

router.post('/add',userconroller.addUser)
router.post('/loginpage',userconroller.loginuser)

export default router