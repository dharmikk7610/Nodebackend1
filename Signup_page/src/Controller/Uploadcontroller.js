import multer from "multer";
import model from "mongoose"
import uploadfile from "../utils/uploadfile.js";



const storage = multer.diskStorage({
    filename : (req,file,cb)=>{
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
          try {
      const uploadedInfo = await uploadfile(req.file.path);
      res.status(201).json({
        message: "File uploaded successfully",
        data: uploadedInfo
      });
    } catch (e) {
      res.status(500).json({ error: "Post‑upload processing failed", details: e.message });
    }
    })
}
export default {uploadFile}