"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AyoAweMinController_1 = require("../controller/AyoAweMinController");
const AyoAweMinImage_1 = __importDefault(require("../config/AyoAweMinImage"));
const ministryRouter = express_1.default.Router();
ministryRouter.post("/registerminister", AyoAweMinImage_1.default, AyoAweMinController_1.registerMinistry);
ministryRouter.get("/allministers", AyoAweMinController_1.getAllMinisters);
exports.default = ministryRouter;
