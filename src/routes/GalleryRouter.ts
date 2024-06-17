import express from "express";
import { createAudio, getAllAudios, getAudioById } from "../controller/SermonController";
import uploadImage from "../config/multerImage";
import { createGalleryItem, getGalleryItems } from "../controller/GalleryController";


const galleryRouter = express.Router();

galleryRouter.post('/uploadimage', uploadImage, createGalleryItem);
galleryRouter.get('/getimages', getGalleryItems)



export default galleryRouter;
