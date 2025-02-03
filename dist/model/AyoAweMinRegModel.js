"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ministriesSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please enter your title"],
    },
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number"],
    },
    whatsapp: {
        type: String,
    },
    // address: {
    //     type: String,
    //     required: [true, "Please enter your address"],
    // },
    city: {
        type: String,
        required: [true, "Please enter your city"],
    },
    state: {
        type: String,
        required: [true, "Please enter your state"],
    },
    country: {
        type: String,
        required: [true, "Please enter your country"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: [true, "Please select your gender"],
    },
    ministryCall: {
        type: String,
        enum: ["Yes", "No"],
        required: [true, "Please specify if you feel called to ministry"],
    },
    other: {
        type: String,
    },
    whichMinistry: {
        type: String,
        required: [true, "Please specify which ministry you currently belong to"],
    },
    why: {
        type: String,
        required: [true, "Please explain why you want to join the training"],
    },
    ayoAweMinImage: {
        type: String,
        required: [true, "please, upload image"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const ministriesModel = mongoose_1.default.model("ayoAweMinImage", ministriesSchema);
exports.default = ministriesModel;
