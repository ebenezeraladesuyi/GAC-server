"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const AyoAweMinRegModel_1 = __importDefault(require("../model/AyoAweMinRegModel"));
const db_1 = __importDefault(require("../config/db"));
// Upload an image from a URL to Cloudinary
const uploadToCloudinary = async (imageUrl) => {
    try {
        const result = await cloudinary_1.default.uploader.upload(imageUrl, {
            resource_type: "auto",
            folder: "ministries", // Folder in Cloudinary
        });
        return result.secure_url; // Return the secure URL of the uploaded image
    }
    catch (error) {
        console.error("❌ Cloudinary Upload Failed:", error);
        return null;
    }
};
const migrateImages = async () => {
    await (0, db_1.default)(); // Connect to the database
    console.log("🔍 Fetching ministers from the database...");
    const ministers = await AyoAweMinRegModel_1.default.find();
    for (const minister of ministers) {
        if (!minister.ayoAweMinImage) {
            console.warn(`🚨 No image path found for minister ${minister._id}`);
            continue; // Skip if no image URL is found
        }
        const imageUrl = minister.ayoAweMinImage; // Get the image URL from the database
        console.log(`🔍 Processing image for minister ${minister._id}:`, imageUrl);
        try {
            // Upload the image URL to Cloudinary
            const cloudinaryUrl = await uploadToCloudinary(imageUrl);
            if (cloudinaryUrl) {
                // Update the database with the new Cloudinary URL
                await AyoAweMinRegModel_1.default.findByIdAndUpdate(minister._id, {
                    ayoAweMinImage: cloudinaryUrl,
                });
                console.log(`✅ Updated Image: ${cloudinaryUrl}`);
            }
            else {
                console.error(`❌ Failed to upload image for minister ${minister._id}`);
            }
        }
        catch (error) {
            console.error(`🚨 Error uploading image for minister ${minister._id}:`, error);
        }
    }
    console.log("✅ Migration completed. Closing database connection...");
    await mongoose_1.default.disconnect(); // Close the database connection
};
migrateImages().catch((error) => {
    console.error("❌ Migration failed:", error);
    mongoose_1.default.disconnect(); // Ensure DB closes on failure
});
