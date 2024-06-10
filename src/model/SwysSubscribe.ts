import mongoose from "mongoose";

interface iSubscribe {
  fullName: string;
  email: string;
}

interface SWYSsubscribe extends iSubscribe, mongoose.Document {}

const swysSchema = new mongoose.Schema({
    fullName: {
    type: String,
    required: [true, "please enter your fullname"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
  },

 
});


const swysSubscribeModel = mongoose.model<SWYSsubscribe>("subscribe" , swysSchema)

export default swysSubscribeModel