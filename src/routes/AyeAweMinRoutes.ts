import express from "express"
import { registerMinistry } from "../controller/AyoAweMinController"
import uploadImage2 from "../config/AyoAweMinImage";


const ministryRouter = express.Router()

ministryRouter.post("/registerminister", uploadImage2, registerMinistry)


export default ministryRouter;