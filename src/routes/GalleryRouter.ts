import express from "express";
import { createAudio, getAllAudios, getAudioById } from "../controller/SermonController";
import uploadImage from "../config/multerImage";
import { createGalleryItem } from "../controller/GalleryController";


const galleryRouter = express.Router();

galleryRouter.post('/uploadimage', uploadImage, createGalleryItem);



export default galleryRouter;
