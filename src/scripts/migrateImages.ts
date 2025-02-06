import cloudinary from "../config/cloudinary";
import mongoose from "mongoose";
import ministriesModel from "../model/AyoAweMinRegModel";
import dbConfig from "../config/db";

// Upload an image from a URL to Cloudinary
const uploadToCloudinary = async (imageUrl: string) => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      resource_type: "auto", // Auto-detect image type
      folder: "ministries", // Folder in Cloudinary
    });
    return result.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error("❌ Cloudinary Upload Failed:", error);
    return null;
  }
};

const migrateImages = async () => {
  await dbConfig(); // Connect to the database

  console.log("🔍 Fetching ministers from the database...");
  const ministers = await ministriesModel.find();

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
        await ministriesModel.findByIdAndUpdate(minister._id, {
          ayoAweMinImage: cloudinaryUrl,
        });
        console.log(`✅ Updated Image: ${cloudinaryUrl}`);
      } else {
        console.error(`❌ Failed to upload image for minister ${minister._id}`);
      }
    } catch (error) {
      console.error(`🚨 Error uploading image for minister ${minister._id}:`, error);
    }
  }

  console.log("✅ Migration completed. Closing database connection...");
  await mongoose.disconnect(); // Close the database connection
};

migrateImages().catch((error) => {
  console.error("❌ Migration failed:", error);
  mongoose.disconnect(); // Ensure DB closes on failure
});