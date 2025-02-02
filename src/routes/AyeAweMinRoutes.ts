import express from "express"
import { registerMinistry } from "../controller/AyoAweMinController"


const ministryRouter = express.Router()

ministryRouter.post("/registerminister", registerMinistry)


export default ministryRouter;