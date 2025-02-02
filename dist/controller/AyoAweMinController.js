"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMinistry = exports.updateMinistry = exports.getMinistryById = exports.getAllMinistries = exports.registerMinistry = void 0;
const AyoAweMinRegModel_1 = __importDefault(require("../model/AyoAweMinRegModel"));
// Create a new Ministry entry
const registerMinistry = async (req, res) => {
    try {
        const { title, firstName, middleName, lastName, email, phoneNumber, whatsapp, address, city, state, country, gender, ministryCall, other, whichMinistry, why, } = req.body;
        // Check if ministry already exists
        const checkExist = await AyoAweMinRegModel_1.default.findOne({ email });
        if (checkExist) {
            return res.status(400).json({
                message: "This email has already been used",
            });
        }
        // Create a new ministry entry
        const newMinistry = await AyoAweMinRegModel_1.default.create({
            title,
            firstName,
            middleName,
            lastName,
            email,
            phoneNumber,
            whatsapp,
            address,
            city,
            state,
            country,
            gender,
            ministryCall,
            other,
            whichMinistry,
            why,
        });
        return res.status(201).json({
            message: "Minister registered successfully",
            data: newMinistry,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to register minister",
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
};
exports.registerMinistry = registerMinistry;
// Get all Ministry entries
const getAllMinistries = async (req, res) => {
    try {
        const ministries = await AyoAweMinRegModel_1.default.find();
        res.status(200).json({
            success: true,
            data: ministries,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching ministries",
            error: error.message,
        });
    }
};
exports.getAllMinistries = getAllMinistries;
// Get a single Ministry entry by ID
const getMinistryById = async (req, res) => {
    try {
        const ministry = await AyoAweMinRegModel_1.default.findById(req.params.id);
        if (!ministry) {
            return res.status(404).json({
                success: false,
                message: "Ministry entry not found",
            });
        }
        res.status(200).json({
            success: true,
            data: ministry,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching ministry entry",
            error: error.message,
        });
    }
};
exports.getMinistryById = getMinistryById;
// Update a Ministry entry by ID
const updateMinistry = async (req, res) => {
    try {
        const updatedMinistry = await AyoAweMinRegModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedMinistry) {
            return res.status(404).json({
                success: false,
                message: "Ministry entry not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Ministry entry updated successfully",
            data: updatedMinistry,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating ministry entry",
            error: error.message,
        });
    }
};
exports.updateMinistry = updateMinistry;
// Delete a Ministry entry by ID
const deleteMinistry = async (req, res) => {
    try {
        const deletedMinistry = await AyoAweMinRegModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedMinistry) {
            return res.status(404).json({
                success: false,
                message: "Ministry entry not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Ministry entry deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting ministry entry",
            error: error.message,
        });
    }
};
exports.deleteMinistry = deleteMinistry;
