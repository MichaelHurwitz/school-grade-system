import { Request, Response } from 'express';
import { addGrade, updateGrade, deleteGrade, getClassStudents } from '../services/teacherService';

export const addGradeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId, subject, score, classId } = req.body;
    const updatedStudent = await addGrade(studentId, subject, score, classId);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding grade', error });
  }
};

export const updateGradeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId, subject, newScore, classId } = req.body;
    const updatedStudent = await updateGrade(studentId, subject, newScore, classId);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating grade', error });
  }
};

export const deleteGradeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId, subject, classId } = req.body;
    const updatedStudent = await deleteGrade(studentId, subject, classId);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting grade', error });
  }
};

export const getClassStudentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { classId } = req.params;
    const students = await getClassStudents(classId);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};
