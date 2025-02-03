import express from "express"
import { getAllMinisters, registerMinistry } from "../controller/AyoAweMinController"
import uploadImage2 from "../config/AyoAweMinImage";


const ministryRouter = express.Router()

ministryRouter.post("/registerminister", uploadImage2, registerMinistry)
ministryRouter.get("/allministers", getAllMinisters)


export default ministryRouter;