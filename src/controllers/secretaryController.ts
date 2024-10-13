import { Request, Response } from 'express';
import { createSecretary, updateSecretary, deleteSecretary } from '../services/secretaryService';
import { createTeacher, updateTeacher, deleteTeacher } from '../services/teacherService';
import { createStudent, updateStudent, deleteStudent } from '../services/studentService';

  
export const createUserController = async (req: Request, res: Response) => {
    try {
      const { role } = req.body;
  
      if (!role) {
        return res.status(400).json({ message: 'Role is required' });
      }
  
      let newUser;
  
      if (role === 'secretary') {
        newUser = await createSecretary(req.body);
      } else if (role === 'teacher') {
        newUser = await createTeacher(req.body);
      } else if (role === 'student') {
        newUser = await createStudent(req.body);
      } else {
        return res.status(400).json({ message: 'Invalid role specified' });
      }
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  };

  export const updateUserController = async (req: Request, res: Response) => {
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
        return res.status(400).json({ message: 'Invalid role specified' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  };

export const deleteUserController = async (req: Request, res: Response) => {
    try {
      const { role } = req.body;
      const userId = req.params.id;
  
      if (!role) {
        return res.status(400).json({ message: 'Role is required' });
      }
  
      if (role === 'secretary') {
        await deleteSecretary(userId);
      } else if (role === 'teacher') {
        await deleteTeacher(userId);
      } else if (role === 'student') {
        await deleteStudent(userId);
      } else {
        return res.status(400).json({ message: 'Invalid role specified' });
      }
  
      res.status(200).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: `Error deleting`, error });
    }
  };