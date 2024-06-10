import express, { Application , Request , Response } from "express";
import cors from "cors";
import memberRouter from "./routes/MemberRouter";
import swysSubscribeRouter from "./routes/SwysSubscribeRouter";
import audioRouter from "./routes/SermonRouter";
import bodyParser from "body-parser";
import contactUsRouter from "./routes/ContactUsRouter";


const appConfig = (app: Application) => {
  app.use(express.json()).use(cors()).use(bodyParser.json());

  //routes
  app.use("/member" , memberRouter);
  app.use("/subscribe", swysSubscribeRouter)
  app.use("/audio", audioRouter)
  app.use("/contact", contactUsRouter)


  app.get("/" , (req: Request , res:Response)=>{
    return res.status(200).json({
      message : "default get"
    })
  })
};



export default appConfig