import { Request, Response } from 'express';
import { getStudentServiceById } from '../services/studentService';

export const getStudentController = async (req: Request, res: Response) => {
  try {
    const student = await getStudentServiceById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student', error });
  }
};
