import { Request, Response } from 'express';
import { addGradeService, updateGradeService, deleteGradeService } from '../services/teacherService';

export const addGradeController = async (req: Request, res: Response) => {
  try {
    await addGradeService(req.body.studentId, req.body);
    res.status(201).json({ message: 'Grade added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding grade', error });
  }
};

export const updateGradeController = async (req: Request, res: Response) => {
  try {
    await updateGradeService(req.body.studentId, req.body);
    res.status(200).json({ message: 'Grade updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating grade', error });
  }
};

export const deleteGradeController = async (req: Request, res: Response) => {
  try {
    await deleteGradeService(req.body.studentId, req.body.subject);
    res.status(200).json({ message: 'Grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting grade', error });
  }
};
