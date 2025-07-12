import multer from "multer";
import model from 'mongoose';
import User from '../models/user.js'
import uploadfile from '../utils/Cloudinary.js'

const storage = multer.diskStorage({
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    },
    destination:"./uploads"
})

const upload = multer(
    {
        storage:storage
    }
).single("file")

const uploadFile = async(req,res)=>{
    
     upload(req,res,async(err)=>{
        if(err){
            res.status(500).json({
                message:err
            })   
        }
        else{
            //file path datbase...
            console.log(req.body)
           const cloudres  = await uploadfile(req.file.path)
            res.status(201).json({
                message:"file uploaded successfully!!!",
                data:req.file ,
                cloudres
            })
        }

    })



}
export default {uploadFile}
