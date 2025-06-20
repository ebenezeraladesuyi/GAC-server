"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getAllStudents = exports.createStudent = void 0;
const ElevationModel_1 = __importDefault(require("../model/ElevationModel"));
const createStudent = async (req, res) => {
    try {
        const student = await ElevationModel_1.default.create(req.body);
        res.status(201).json({ success: true, data: student });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.createStudent = createStudent;
const getAllStudents = async (_req, res) => {
    try {
        const students = await ElevationModel_1.default.find();
        res.status(200).json({ success: true, data: students });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getAllStudents = getAllStudents;
const getStudentById = async (req, res) => {
    try {
        const student = await ElevationModel_1.default.findById(req.params.id);
        if (!student)
            return res.status(404).json({ success: false, message: 'Student not found' });
        res.status(200).json({ success: true, data: student });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getStudentById = getStudentById;
const updateStudent = async (req, res) => {
    try {
        const student = await ElevationModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student)
            return res.status(404).json({ success: false, message: 'Student not found' });
        res.status(200).json({ success: true, data: student });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res) => {
    try {
        const student = await ElevationModel_1.default.findByIdAndDelete(req.params.id);
        if (!student)
            return res.status(404).json({ success: false, message: 'Student not found' });
        res.status(200).json({ success: true, message: 'Student deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.deleteStudent = deleteStudent;
