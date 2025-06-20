import { Router } from 'express';
import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from '../controller/ElevationController';

const elevationRouter = Router();

elevationRouter.post('/create', createStudent);
elevationRouter.get('/getall', getAllStudents);
elevationRouter.get('/getone/:id', getStudentById);
elevationRouter.put('/updateone/:id', updateStudent);
elevationRouter.delete('/delete/:id', deleteStudent);

export default elevationRouter;
