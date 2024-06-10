"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const memberSchema = new mongoose_1.default.Schema({
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
const memberModel = mongoose_1.default.model("GAMA", memberSchema);
exports.default = memberModel;
