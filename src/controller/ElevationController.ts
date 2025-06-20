import { Request, Response } from 'express';
import ElevationModel from '../model/ElevationModel';

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await ElevationModel.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllStudents = async (_req: Request, res: Response) => {
  try {
    const students = await ElevationModel.find();
    res.status(200).json({ success: true, data: students });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await ElevationModel.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.status(200).json({ success: true, data: student });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await ElevationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.status(200).json({ success: true, data: student });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await ElevationModel.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
