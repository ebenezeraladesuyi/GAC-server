import express from "express"
import { getAllSubscribed, userSubscribe } from "../controller/SwysSubscribeContoller";

const swysSubscribeRouter = express.Router()

swysSubscribeRouter.get("/allsubscribed" , getAllSubscribed);
swysSubscribeRouter.post("/usersubscribe", userSubscribe);


export default swysSubscribeRouter;