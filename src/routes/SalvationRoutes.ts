import express from "express";
import { sendSalvationMessage } from "../controller/SalvationController";


const salvationRouter = express.Router();

salvationRouter.post('/createsalvationmail', sendSalvationMessage);
// contactUsRouter.get('/allaudios', getAllAudios);

export default salvationRouter;
