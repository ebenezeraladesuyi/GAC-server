"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSubscribe = exports.getAllSubscribed = void 0;
const SwysSubscribe_1 = __importDefault(require("../model/SwysSubscribe"));
const getAllSubscribed = async (req, res) => {
    try {
        const users = await SwysSubscribe_1.default.find();
        return res.status(200).json({
            message: "gotten all subscribed",
            data: users,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get all subscribed",
            data: error,
        });
    }
};
exports.getAllSubscribed = getAllSubscribed;
//get one user
// export const getOneUser = async (req: Request, res: Response) => {
//   try {
//     const users = await UserModel.findById(req.params.userId);
//     return res.status(200).json({
//       message: "gotten one user",
//       data: users,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: "failed to get all users",
//       data: error,
//     });
//   }
// };
//register a user
const userSubscribe = async (req, res) => {
    try {
        const { fullName, email, } = req.body;
        const checkExist = await SwysSubscribe_1.default.findOne({ email });
        if (checkExist) {
            return res.status(500).json({
                message: "This email has already subscribed",
            });
        }
        else {
            const users = await SwysSubscribe_1.default.create({
                fullName,
                email,
            });
            return res.status(200).json({
                message: "successfully subscribed",
                data: users,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to subscribe",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
};
exports.userSubscribe = userSubscribe;
