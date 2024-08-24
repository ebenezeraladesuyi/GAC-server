"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAudioById = exports.getAllAudios = exports.createAudio = void 0;
const SermonModel_1 = __importDefault(require("../model/SermonModel"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import aud from "../../Uploads/audio"
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
        const allAudios = await SermonModel_1.default.find().sort({ createdAt: -1 });
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
// get one audio
// export const getAudioById = async (req: Request, res: Response) => {
//     try {
//         const audio = await audioModel.findById(req.params.id);
//         if (!audio) {
//             return res.status(404).json({ message: "Audio not found" });
//         }
//         // Set the correct content type header
//         res.setHeader('Content-Type', 'audio/mpeg');
//         // Construct the path to the audio file
//         const audioPath = path.join(__dirname, '../../Uploads/audio', audio.audio); // Adjust the path as needed
//         // Check if the file exists
//         if (!fs.existsSync(audioPath)) {
//             console.error(`Audio file not found: ${audioPath}`);
//             return res.status(404).json({ message: "Audio file not found" });
//         }
//         // Create a read stream for the audio file
//         const audioStream = fs.createReadStream(audioPath);
//         // Pipe the audio stream to the response
//         audioStream.pipe(res);
//     } catch (error) {
//         console.error('Error fetching audio:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };
const getAudioById = async (req, res) => {
    try {
        const audio = await SermonModel_1.default.findById(req.params.id);
        if (!audio) {
            return res.status(404).json({ message: "Audio not found" });
        }
        // Set the correct content type header
        res.setHeader('Content-Type', 'audio/mpeg');
        // Construct the path to the audio file
        const audioPath = path_1.default.join(__dirname, '../../Uploads/audio', audio.audio); // Adjust the path as needed
        // Check if the file exists
        if (!fs_1.default.existsSync(audioPath)) {
            console.error(`Audio file not found: ${audioPath}`);
            return res.status(404).json({ message: "Audio file not found" });
        }
        // Create a read stream for the audio file
        const audioStream = fs_1.default.createReadStream(audioPath);
        // Pipe the audio stream to the response
        audioStream.pipe(res);
    }
    catch (error) {
        console.error('Error fetching audio:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getAudioById = getAudioById;
