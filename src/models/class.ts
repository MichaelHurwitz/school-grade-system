import mongoose, { Schema, Document } from 'mongoose';
import validator from "validator";


export interface IClass extends Document {
  name: string;
  studentIds: mongoose.Types.ObjectId[];
}

const classSchema: Schema = new Schema({
  name: { type: String, 
    required: [true, 'Class name is required'] },
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    validate: {
        validator: function (v: mongoose.Types.ObjectId[]) {
          return Array.isArray(v);
        },
        message: 'Student IDs must be an array'
      }
}]
});

export const Class = mongoose.model<IClass>('Class', classSchema);
