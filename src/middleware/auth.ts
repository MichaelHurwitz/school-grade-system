import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;  // receiving token from cookie
  
    if (!token) {
       res.status(401).send('Access Denied');
    }
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).user = verified;
      next();
    } catch (err) {
      res.status(400).send('Invalid Token');
    }
  };


export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if ((req as any).user?.role !== role) {
      res.status(403).send('Permission Denied'); 
      return; 
    }
    next();
  };
};
