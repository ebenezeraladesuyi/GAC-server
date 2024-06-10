import {Request, Response, NextFunction} from "express";
import audioModel from "../model/SermonModel"; 


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

