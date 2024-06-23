import mongoose from "mongoose";

interface member {
  name: string;
  phoneNumber: string;
  email: string;
  when: string;
  how : string;
  will : string;
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
  when: {
    type: String,
    required: [true, "please enter when you started attending GAC"],
  },
  how: {
    type: String,
    required: [true, "how did you get to know about GAC"],
  },
  will: {
    type: String,
    required: [true, "will you like to be part of the workforce? if yes, state service of interest"],
  }
 
});


const memberModel = mongoose.model<iMember>("GAMA" , memberSchema)

export default memberModel