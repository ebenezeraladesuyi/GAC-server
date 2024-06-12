import express from "express";
import { createAudio, getAllAudios, getAudioById } from "../controller/SermonController";
import uploadAudio from "../config/multer";


const audioRouter = express.Router();

audioRouter.post('/uploadaudio', uploadAudio, createAudio);
audioRouter.get('/allaudios', getAllAudios);
audioRouter.get('/getoneaudio/:id', getAudioById);

export default audioRouter;
