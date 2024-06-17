import express, { Application , Request , Response } from "express";
import cors from "cors";
import memberRouter from "./routes/MemberRouter";
import swysSubscribeRouter from "./routes/SwysSubscribeRouter";
import audioRouter from "./routes/SermonRouter";
import bodyParser from "body-parser";
import contactUsRouter from "./routes/ContactUsRouter";
import galleryRouter from "./routes/GalleryRouter";


const appConfig = (app: Application) => {
  app.use(express.json()).use(cors()).use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  //routes
  app.use("/member" , memberRouter);
  app.use("/subscribe", swysSubscribeRouter)
  app.use("/audio", audioRouter)
  app.use("/contact", contactUsRouter)
  app.use("/gallery", galleryRouter)


  app.get("/" , (req: Request , res:Response)=>{
    return res.status(200).json({
      message : "default get"
    })
  })
};



export default appConfig