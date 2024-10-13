import { Request, Response } from 'express';
import { createSecretaryService, updateSecretaryService, deleteSecretaryService } from '../services/secretaryService';

export const createSecretaryController = async (req: Request, res: Response) => {
  try {
    const newSecretary = await createSecretaryService(req.body);
    res.status(201).json(newSecretary);
  } catch (error) {
    res.status(500).json({ message: 'Error creating secretary', error });
  }
};

export const updateSecretaryController = async (req: Request, res: Response) => {
  try {
    const updatedSecretary = await updateSecretaryService(req.params.id, req.body);
    res.status(200).json(updatedSecretary);
  } catch (error) {
    res.status(500).json({ message: 'Error updating secretary', error });
  }
};

export const deleteSecretaryController = async (req: Request, res: Response) => {
  try {
    await deleteSecretaryService(req.params.id);
    res.status(200).json({ message: 'Secretary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting secretary', error });
  }
};
