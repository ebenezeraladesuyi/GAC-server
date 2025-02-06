"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const AyoAweMinRegModel_1 = __importDefault(require("../model/AyoAweMinRegModel"));
const db_1 = __importDefault(require("../config/db"));
dotenv_1.default.config(); // Load environment variables
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
    await (0, db_1.default)(); // Ensure DB is connected
    console.log("🚀 Starting image migration...");
    const ministries = await AyoAweMinRegModel_1.default.find();
    for (const ministry of ministries) {
        if (ministry.ayoAweMinImage && !ministry.ayoAweMinImage.startsWith("http")) {
            const localPath = path_1.default.join(__dirname, "../../", ministry.ayoAweMinImage); // Adjust path to image
            if (fs_1.default.existsSync(localPath)) {
                try {
                    console.log(`📤 Uploading: ${ministry.ayoAweMinImage}`);
                    const result = await cloudinary_1.default.uploader.upload(localPath, { folder: "ministries" });
                    // Update database with new Cloudinary URL
                    await AyoAweMinRegModel_1.default.findByIdAndUpdate(ministry._id, { ayoAweMinImage: result.secure_url });
                    console.log(`✅ Updated: ${ministry.email} with ${result.secure_url}`);
                }
                catch (err) {
                    console.error(`❌ Failed to upload ${ministry.ayoAweMinImage}`, err);
                }
            }
            else {
                console.warn(`⚠️ File not found: ${localPath}`);
            }
        }
    }
    console.log("✅ Migration complete!");
    mongoose_1.default.disconnect(); // Close DB connection
};
// Run the migration
migrateImages();
