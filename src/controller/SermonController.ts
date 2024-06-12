import {Request, Response, NextFunction} from "express";
import audioModel from "../model/SermonModel"; 
import fs from 'fs';
import path from 'path';
// import aud from "../../Uploads/audio"


// upload audio function
export const createAudio = async (req: Request, res: Response) => {
    try {
        const { title, author } = req.body;
        const audio = req.file?.filename;
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

        const audios = await audioModel.create({
            title,
            // image,
            audio,
            author 
        });

        // save the audio doc to the database
            const savedAudio = await audios.save()

        return res.status(200).json({
            message: "audio uploaded",
            data: savedAudio,
        })
    } catch (error: any) {
        return res.status(400).json({
            message: "audio failed to upload",
            data: error?.message
        })
    }
}


// get all audios
export const getAllAudios = async (req: Request, res: Response)  => {
    try {
       const allAudios = await audioModel.find()
       
       return res.status(200).json({
        message: "all audios gotton",
        data: allAudios
       })
    } catch (error) {
        return res.status(400).json({
            message: "failed to get all audio",
            data: error
        })
    }
}


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

export const getAudioById = async (req: Request, res: Response) => {
    try {
        const audio = await audioModel.findById(req.params.id);

        if (!audio) {
            return res.status(404).json({ message: "Audio not found" });
        }

        // Set the correct content type header
        res.setHeader('Content-Type', 'audio/mpeg');

        // Construct the path to the audio file
        const audioPath = path.join(__dirname, '../../Uploads/audio', audio.audio); // Adjust the path as needed

        // Check if the file exists
        if (!fs.existsSync(audioPath)) {
            console.error(`Audio file not found: ${audioPath}`);
            return res.status(404).json({ message: "Audio file not found" });
        }

        // Create a read stream for the audio file
        const audioStream = fs.createReadStream(audioPath);

        // Pipe the audio stream to the response
        audioStream.pipe(res);
    } catch (error) {
        console.error('Error fetching audio:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

