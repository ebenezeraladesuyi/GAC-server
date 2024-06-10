import mongoose from "mongoose";

interface member {
  name: string;
  phoneNumber: string;
  email: string;
  why : string;
}

interface iMember extends member, mongoose.Document {}

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your firstname"],
  },
  phoneNumber: {
    type: String,
    required: [true, "please enter your phone number"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
  },
  why: {
    type: String,
    required: [true, "please enter why you would like to be a member"],
  },
 
});


const memberModel = mongoose.model<iMember>("GAMA" , memberSchema)

export default memberModel