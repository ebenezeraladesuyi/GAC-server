"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// multer configuration for audio
const audioStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads/audio/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
// export const uploadAudio = multer({ storage: audioStorage }).single('audio');
const uploadAudio = (0, multer_1.default)({
    storage: audioStorage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 10 MB, change this value according to your requirements
    },
    fileFilter: function (req, file, cb) {
        // Allowed file types
        cb(null, true);
    }
}).single('audio');
exports.default = uploadAudio;
// multer configuration for image
// const imageStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'Uploads/images/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const uploadImage = multer({
//     storage: imageStorage,
//     limits: {
//         fileSize: 15 * 1024 * 1024 // 10 MB, change this value according to your requirements
//     },
//     fileFilter: function (req, file, cb) {
//         // Allowed file types
//         cb(null, true);
//         }
// }).single('image');
// export {uploadImage};
