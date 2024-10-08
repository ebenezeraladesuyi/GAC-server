import mongoose, { Schema } from "mongoose";

export interface iAudio extends Document {
    title: string;
    // image: File | null;
    audio: string;
    author: string;
}

const AudioSchema: Schema = new Schema({
    title:{
        type: String,
        required: true,
    },
    // image:{
    //     type: String,
    //     required: true,
    // },
    audio:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
}, { timestamps: true });

const audioModel = mongoose.model<iAudio>('Audio', AudioSchema)

export default audioModel


