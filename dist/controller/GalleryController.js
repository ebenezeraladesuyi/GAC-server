"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGalleryItem = exports.updateGalleryItem = exports.getGalleryItemById = exports.getGalleryItems = exports.createGalleryItem = void 0;
const GalleryModel_1 = __importDefault(require("../model/GalleryModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
// create image
const createGalleryItem = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        // Upload image to Cloudinary
        const result = await cloudinary_1.default.uploader.upload(req.file.path, {
            folder: 'gallery' // Optional: Folder in Cloudinary where images will be stored
        });
        // Create new gallery item with Cloudinary URL
        const newGalleryItem = new GalleryModel_1.default({ gacImage: result.secure_url });
        await newGalleryItem.save();
        res.status(201).json(newGalleryItem);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createGalleryItem = createGalleryItem;
// export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { pics } = req.body; // Assuming pics is sent in the request body
//         const newGalleryItem = new galleryModel({ pics });
//         await newGalleryItem.save();
//         res.status(201).json(newGalleryItem);
//     } catch (error : any) {
//         res.status(500).json({ message: error.message });
//     }
// };
// get all images
const getGalleryItems = async (req, res) => {
    try {
        const galleryItems = await GalleryModel_1.default.find();
        res.status(200).json(galleryItems);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getGalleryItems = getGalleryItems;
// get one image
const getGalleryItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const galleryItem = await GalleryModel_1.default.findById(id);
        if (galleryItem) {
            res.status(200).json(galleryItem);
        }
        else {
            res.status(404).json({ message: 'Gallery item not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getGalleryItemById = getGalleryItemById;
// update image
const updateGalleryItem = async (req, res) => {
    const { id } = req.params;
    const { pics } = req.body;
    try {
        const updatedGalleryItem = await GalleryModel_1.default.findByIdAndUpdate(id, { pics }, { new: true });
        if (updatedGalleryItem) {
            res.status(200).json(updatedGalleryItem);
        }
        else {
            res.status(404).json({ message: 'Gallery item not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateGalleryItem = updateGalleryItem;
// delete image
const deleteGalleryItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedGalleryItem = await GalleryModel_1.default.findByIdAndDelete(id);
        if (deletedGalleryItem) {
            res.status(200).json({ message: 'Gallery item deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Gallery item not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteGalleryItem = deleteGalleryItem;
