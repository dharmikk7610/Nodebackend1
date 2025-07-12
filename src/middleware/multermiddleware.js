// middleware/uploadFile.js
import multer from "multer";
import uploadfile from "../utils/Cloudinary.js";
import fs from "fs";

/* Multer setup */
const storage = multer.diskStorage({
  filename: (req, file, cb) => cb(null, file.originalname),
  destination: "./uploads",
});

const upload = multer({ storage }).single("file");

/* Middleware function */
const uploadFile = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error in file upload",
        error: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No file provided",
      });
    }

    try {
      // Upload to Cloudinary
      const uploadedInfo = await uploadfile(req.file.path);

      // Optional: delete local temp file
      fs.unlink(req.file.path, () => {});

      // Attach to req object for next middleware/controller
      req.cloudinaryFile = {
        url: uploadedInfo.secure_url,
        public_id: uploadedInfo.public_id,
        original: req.file.originalname,
      };

      return next();
      
    } catch (e) {
      return res.status(500).json({
        error: "Post-upload processing failed",
        details: e.message,
      });
    }
  });
};

export default uploadFile;
