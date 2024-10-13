import { Request, Response } from 'express';
import { createSecretary, updateSecretary, deleteSecretary } from '../services/secretaryService';
import { createTeacher, updateTeacher, deleteTeacher } from '../services/teacherService';
import { createStudent, updateStudent, deleteStudent } from '../services/studentService';

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.body;
    if (!role) {
      res.status(400).json({ message: 'Role is required' });
      return;
    }
    let newUser;
    if (role === 'secretary') {
      newUser = await createSecretary(req.body);
    } else if (role === 'teacher') {
      newUser = await createTeacher(req.body);
    } else if (role === 'student') {
      newUser = await createStudent(req.body);
    } else {
      res.status(400).json({ message: 'Invalid role specified' });
      return;
    }
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.body;
    const userId = req.params.id;
    let updatedUser;
    if (role === 'secretary') {
      updatedUser = await updateSecretary(userId, req.body);
    } else if (role === 'teacher') {
      updatedUser = await updateTeacher(userId, req.body);
    } else if (role === 'student') {
      updatedUser = await updateStudent(userId, req.body);
    } else {
      res.status(400).json({ message: 'Invalid role specified' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.body;
    const userId = req.params.id;
    if (!role) {
      res.status(400).json({ message: 'Role is required' });
      return;
    }
    if (role === 'secretary') {
      await deleteSecretary(userId);
    } else if (role === 'teacher') {
      await deleteTeacher(userId);
    } else if (role === 'student') {
      await deleteStudent(userId);
    } else {
      res.status(400).json({ message: 'Invalid role specified' });
      return;
    }
    res.status(200).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: `Error deleting`, error });
  }
};
