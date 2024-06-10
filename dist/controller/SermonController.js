"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAudios = exports.createAudio = void 0;
const SermonModel_1 = __importDefault(require("../model/SermonModel"));
// upload audio function
const createAudio = async (req, res) => {
    var _a;
    try {
        const { title, author } = req.body;
        const audio = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        // const image = req.file?.filename;
        if (!audio) {
            return res.status(400).json({
                message: "Audio file is required"
            });
        }
        // if (!image) {
        //     return res.status(400).json({
        //         message: "image file is required"
        //     });
        // }
        const audios = await SermonModel_1.default.create({
            title,
            // image,
            audio,
            author
        });
        // save the audio doc to the database
        const savedAudio = await audios.save();
        return res.status(200).json({
            message: "audio uploaded",
            data: savedAudio,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "audio failed to upload",
            data: error === null || error === void 0 ? void 0 : error.message
        });
    }
};
exports.createAudio = createAudio;
// get all audios
const getAllAudios = async (req, res) => {
    try {
        const allAudios = await SermonModel_1.default.find();
        return res.status(200).json({
            message: "all audios gotton",
            data: allAudios
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get all audio",
            data: error
        });
    }
};
exports.getAllAudios = getAllAudios;
