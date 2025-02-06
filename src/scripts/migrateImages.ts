import cloudinary from "../config/cloudinary";  
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import ministriesModel from "../model/AyoAweMinRegModel";
import dbConfig from "../config/db";

dotenv.config();  // Load environment variables

// Connect to MongoDB
// const startDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI as string);
//     console.log("✅ Connected to MongoDB");
//   } catch (error) {
//     console.error("❌ Error connecting to MongoDB:", error);
//     process.exit(1);
//   }
// };

// Migration function
const migrateImages = async () => {
  await dbConfig();  // Ensure DB is connected

  console.log("🚀 Starting image migration...");
  const ministries = await ministriesModel.find();

  for (const ministry of ministries) {
    if (ministry.ayoAweMinImage && !ministry.ayoAweMinImage.startsWith("http")) {
      const localPath = path.join(__dirname, "../../", ministry.ayoAweMinImage);  // Adjust path to image

      if (fs.existsSync(localPath)) {
        try {
          console.log(`📤 Uploading: ${ministry.ayoAweMinImage}`);
          const result = await cloudinary.uploader.upload(localPath, { folder: "ministries" });

          // Update database with new Cloudinary URL
          await ministriesModel.findByIdAndUpdate(ministry._id, { ayoAweMinImage: result.secure_url });

          console.log(`✅ Updated: ${ministry.email} with ${result.secure_url}`);
        } catch (err) {
          console.error(`❌ Failed to upload ${ministry.ayoAweMinImage}`, err);
        }
      } else {
        console.warn(`⚠️ File not found: ${localPath}`);
      }
    }
  }

  console.log("✅ Migration complete!");
  mongoose.disconnect();  // Close DB connection
};

// Run the migration
migrateImages();
