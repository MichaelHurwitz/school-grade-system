import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from "validator";


export interface IGrade {
    subject: string;
    score: number;
  }
  
  export interface IStudent extends Document {
    fullName: string;
    email: string;
    password: string;
    role: 'student';
    classes: { classId: mongoose.Types.ObjectId; grades: IGrade[] }[];
    isValidPassword(password: string): Promise<boolean>;
  }

  
  const gradeSchema: Schema = new Schema({
    subject: { 
      type: String, 
      required: [true, 'Subject is required'], 
      minlength: [2, 'Subject must be at least 2 characters long'], 
      maxlength: [50, 'Subject must be less than 50 characters'] 
    },
    score: { 
      type: Number, 
      required: [true, 'Score is required'], 
      min: [0, 'Score must be at least 0'], 
      max: [100, 'Score must be at most 100'] 
    }
  });


  const studentSchema: Schema = new Schema({
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
      enum: ['student'], 
      default: 'student' 
    },
    classes: [
        {
          classId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Class', 
            required: [true, 'Class ID is required'] 
          },
          grades: [gradeSchema]
        }
      ]
 });
  
 studentSchema.pre<IStudent>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  studentSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  };
  
  export const Student = mongoose.model<IStudent>('Student', studentSchema);