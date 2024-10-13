import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IClass } from './class';
import validator from "validator";


export interface ITeacher extends Document {
    fullName: string;
    email: string;
    password: string;
    role: 'teacher';
    class: IClass;
    isValidPassword(password: string): Promise<boolean>;
  }

  const teacherSchema: Schema = new Schema({
    fullName: { 
      type: String, 
      required: [true, 'Full name is required'], 
      unique: true,
      minlength: [3, 'Full name must be at least 3 characters long'], 
      maxlength: [100, 'Full name must be less than 100 characters'] 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true, 
      validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: { 
      type: String, 
      required: [true, 'Password is required'], 
      minlength: [6, 'Password must be at least 6 characters long'] 
    },
    role: { 
      type: String, 
      enum: ['teacher'], 
      default: 'teacher' 
    },
    class: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Class', 
      required: [true, 'Class is required'] 
    }
  });
  
  teacherSchema.pre<ITeacher>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  teacherSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  };
  
  export const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);