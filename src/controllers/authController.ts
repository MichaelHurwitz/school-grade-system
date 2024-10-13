import { Request, Response } from 'express';
import { login } from '../services/authService';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
