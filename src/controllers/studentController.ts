import { Request, Response } from 'express';
import { getStudentByEmail } from '../services/studentService';

export const getStudentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await getStudentByEmail(req.params.id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student', error });
  }
};
