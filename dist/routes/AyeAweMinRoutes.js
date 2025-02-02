"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AyoAweMinController_1 = require("../controller/AyoAweMinController");
const ministryRouter = express_1.default.Router();
ministryRouter.post("/registerminister", AyoAweMinController_1.registerMinistry);
exports.default = ministryRouter;
