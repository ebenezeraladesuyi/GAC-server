import cloudinary from "../config/cloudinary";
import mongoose from "mongoose";
import ministriesModel from "../model/AyoAweMinRegModel";
import dbConfig from "../config/db";
import fs from "fs";
import path from "path";
import { Readable } from "stream"; // Importing the stream module

// Function to upload the image buffer to Cloudinary
const uploadToCloudinary = async (imageBuffer: Buffer, filename: string) => {
  return new Promise<string | null>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "ministries", public_id: filename },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary Upload Failed:", error);
          return reject(null);
        }
        resolve(result?.secure_url || null); // Ensure we handle the possible undefined result
      }
    );

    const bufferStream = new Readable();
    bufferStream.push(imageBuffer);
    bufferStream.push(null); // Signaling the end of the stream
    bufferStream.pipe(uploadStream); // Uploading the buffer as a stream
  });
};

const migrateImages = async () => {
  await dbConfig();

  console.log("🔍 Fetching ministers from the database...");
  const ministers = await ministriesModel.find();

  for (const minister of ministers) {
    if (!minister.ayoAweMinImage) {
      console.warn(`🚨 No image path found for minister ${minister._id}`);
      continue;
    }

    const imageBase64 = minister.ayoAweMinImage;
    const matches = imageBase64.match(/^data:image\/([a-zA-Z]*);base64,([^\"]*)/);
    if (matches && matches.length === 3) {
      const imageData = matches[2];
      const buffer = Buffer.from(imageData, "base64");
      const filename = `minister_${minister._id}.jpg`; // Customize filename as needed

      try {
        const cloudinaryUrl = await uploadToCloudinary(buffer, filename);
        if (cloudinaryUrl) {
          await ministriesModel.findByIdAndUpdate(minister._id, {
            ayoAweMinImage: cloudinaryUrl,
          });
          console.log(`✅ Updated Image: ${cloudinaryUrl}`);
        } else {
          console.error(`❌ Failed to upload image for minister ${minister._id}`);
        }
      } catch (error) {
        console.error(`❌ Error during migration for minister ${minister._id}:`, error);
      }
    } else {
      console.warn(`🚨 Invalid image data for minister ${minister._id}`);
    }
  }

  console.log("✅ Migration completed. Closing database connection...");
  await mongoose.disconnect();
};

migrateImages().catch((error) => {
  console.error("❌ Migration failed:", error);
  mongoose.disconnect(); // Ensure DB closes on failure
});
