"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const MemberRouter_1 = __importDefault(require("./routes/MemberRouter"));
const SwysSubscribeRouter_1 = __importDefault(require("./routes/SwysSubscribeRouter"));
const SermonRouter_1 = __importDefault(require("./routes/SermonRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
const ContactUsRouter_1 = __importDefault(require("./routes/ContactUsRouter"));
const appConfig = (app) => {
    app.use(express_1.default.json()).use((0, cors_1.default)()).use(body_parser_1.default.json());
    //routes
    app.use("/member", MemberRouter_1.default);
    app.use("/subscribe", SwysSubscribeRouter_1.default);
    app.use("/audio", SermonRouter_1.default);
    app.use("/contact", ContactUsRouter_1.default);
    app.get("/", (req, res) => {
        return res.status(200).json({
            message: "default get"
        });
    });
};
exports.default = appConfig;
