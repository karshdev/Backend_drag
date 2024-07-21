import multer from "multer";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import createHttpError from "http-errors";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { createResponse } from "../helper/createResponse";
import { sendEmail } from "../utils/email";
cloudinary.config({
  cloud_name: "dbggtaw3v",
  api_key: "643891689849652",
  api_secret: "1iyr9I8GecE6-xDOIQAUZ7hY0mw",
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../..', 'dist', 'app', 'uploads')); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  

const upload = multer({ storage: storage });
const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req.file", req.file);
      if (!req.file) {
        throw createHttpError(400, "No file uploaded");
      }

      const filePath = req.file.path;

      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
      });

      fs.unlinkSync(filePath);

      res.send(
        createResponse(
          { secureUrl: result.secure_url },
          "File uploaded successfully!"
        )
      );
    } catch (error) {
      next(error);
    }
  }
);
router.post(
    "/send-email",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        
       const{file,data}=req.body
      const send=await sendEmail(data,file)       
      if(send.rejected.length < 1){
        res.send(
          createResponse(
            {success:true },
            "File uploaded successfully!"
          )
        );
        return
      } 
      res.send(
        createResponse(
          {success:false },
          "File uploaded successfully!"
        )
      );
      
      } catch (error) {
        next(error);
      }
    }
  );
export default router;
