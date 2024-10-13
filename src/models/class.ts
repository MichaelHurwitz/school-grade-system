import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  name: string;
  studentIds: mongoose.Types.ObjectId[];
}

const classSchema: Schema = new Schema({
  name: { type: String, required: true },
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

export const Class = mongoose.model<IClass>('Class', classSchema);
