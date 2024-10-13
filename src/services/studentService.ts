import { Student } from '../models/student';

export const createStudent = async (studentData: any) => {
  const newStudent = new Student(studentData);
  return await newStudent.save();
};

export const updateStudent = async (id: string, updateData: any) => {
  return await Student.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteStudent = async (id: string) => {
  return await Student.findByIdAndDelete(id);
};

export const getStudentByEmail = async (email: string) => {
    return await Student.findOne({ email })};
