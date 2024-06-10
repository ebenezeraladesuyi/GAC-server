"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const swysSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: [true, "please enter your fullname"],
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
    },
});
const swysSubscribeModel = mongoose_1.default.model("subscribe", swysSchema);
exports.default = swysSubscribeModel;
