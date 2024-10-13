import { Secretary } from '../models/secretary';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const login = async (email: string, password: string) => {
  const user = await Secretary.findOne({ email }) || 
               await Student.findOne({ email }) || 
               await Teacher.findOne({ email });
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' } 
  );

  return token;
};
