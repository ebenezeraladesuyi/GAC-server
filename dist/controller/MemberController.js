"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.getAllMembers = exports.registerMember = void 0;
const MembersModel_1 = __importDefault(require("../model/MembersModel"));
//register a user
const registerMember = async (req, res) => {
    try {
        const { name, email, phoneNumber, when, how, will, } = req.body;
        const checkExist = await MembersModel_1.default.findOne({ email });
        if (checkExist) {
            return res.status(500).json({
                message: "This email has been used",
            });
        }
        else {
            const users = await MembersModel_1.default.create({
                name,
                email,
                phoneNumber,
                when,
                how,
                will,
            });
            return res.status(200).json({
                message: "member registered",
                data: users,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to register member",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
};
exports.registerMember = registerMember;
// get all members
const getAllMembers = async (req, res) => {
    try {
        const users = await MembersModel_1.default.find();
        return res.status(200).json({
            message: "gotten all members",
            data: users,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get all members",
            data: error,
        });
    }
};
exports.getAllMembers = getAllMembers;
// delete one member
const deleteMember = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteForm = await MembersModel_1.default.findByIdAndDelete(id);
        if (deleteForm) {
            res.status(200).json({ message: "Form deleted" });
        }
        else {
            res.status(404).json({ message: "form not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteMember = deleteMember;
