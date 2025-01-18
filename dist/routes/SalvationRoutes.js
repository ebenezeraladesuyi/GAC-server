"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SalvationController_1 = require("../controller/SalvationController");
const salvationRouter = express_1.default.Router();
salvationRouter.post('/createsalvationmail', SalvationController_1.sendSalvationMessage);
// contactUsRouter.get('/allaudios', getAllAudios);
exports.default = salvationRouter;
