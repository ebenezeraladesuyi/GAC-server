import express from "express";
import { createAudio, getAllAudios } from "../controller/SermonController";
import uploadAudio from "../config/multer";


const audioRouter = express.Router();

audioRouter.post('/uploadaudio', uploadAudio, createAudio);
audioRouter.get('/allaudios', getAllAudios);

export default audioRouter;
