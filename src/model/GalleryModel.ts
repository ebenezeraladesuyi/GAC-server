import mongoose from "mongoose";

interface gall {
    gacImage: string | null;
}

interface iGallery extends gall, mongoose.Document {}

const carSchema = new mongoose.Schema({
    gacImage: {
        type: String,
        // required: [true, "please, upload image"]
    },
})

const galleryModel = mongoose.model<iGallery>("gacImage", carSchema);

export default galleryModel;
