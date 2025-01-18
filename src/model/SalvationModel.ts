import mongoose, { Schema } from "mongoose";

export interface iSalvation extends Document {
    name: string;
    email: string;
    phoneNumber: number;
    prayer: string;
}

const SalvationSchema: Schema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    prayer:{
        type: String,
        required: true,
    },
})

const salvationsModel = mongoose.model<iSalvation>('salvation', SalvationSchema)

export default salvationsModel


