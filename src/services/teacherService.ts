import { Teacher } from '../models/teacher';

export const createTeacher = async (teacherData: any) => {
  const newTeacher = new Teacher(teacherData);
  return await newTeacher.save();
};

export const updateTeacher = async (id: string, updateData: any) => {
  return await Teacher.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteTeacher = async (id: string) => {
  return await Teacher.findByIdAndDelete(id);
};
