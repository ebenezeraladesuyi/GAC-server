import mongoose, { Schema, Document } from 'mongoose';

export interface IElevation extends Document {
  name: string;
  sex: string;
  phoneNumber: string;
  department: string;
  level: string;
}

const elevationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    sex: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    department: { type: String, required: true },
    level: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IElevation>('Elevation', elevationSchema);
