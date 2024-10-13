import { Teacher } from '../models/teacher';
import { Class } from '../models/class';
import { Student } from '../models/student';

export const createTeacher = async (teacherData: any) => {
  const newStudent = new Teacher(teacherData);
  return await newStudent.save();
};

export const updateTeacher = async (id: string, updateData: any) => {
  return await Teacher.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteTeacher = async (id: string) => {
  return await Teacher.findByIdAndDelete(id);
};

export const getTeacherByEmail = async (email: string) => {
    return await Teacher.findOne({ email })};


export const addGrade= async (studentId: string, subject: string, score: number, classId: string) => {
  const student = await Student.findById(studentId).lean();

  if (!student) throw new Error('Student not found');

  const studentClass = student.classes.find(c => c.classId.toString() === classId.toString());

  if (!studentClass) throw new Error('Class not found for the student');

  studentClass.grades.push({ subject, score });
  return await Student.findByIdAndUpdate(studentId, { classes: student.classes }, { new: true });
};

export const updateGrade = async (studentId: string, subject: string, newScore: number, classId: string) => {
  const student = await Student.findById(studentId).lean();

  if (!student) throw new Error('Student not found');

  const studentClass = student.classes.find(c => c.classId.toString() === classId.toString());

  if (!studentClass) throw new Error('Class not found for the student');

  const grade = studentClass.grades.find(g => g.subject === subject);

  if (!grade) throw new Error('Grade not found for the subject');

  grade.score = newScore;
  return await Student.findByIdAndUpdate(studentId, { classes: student.classes }, { new: true });
};

export const deleteGrade = async (studentId: string, subject: string, classId: string) => {
  const student = await Student.findById(studentId).lean();

  if (!student) throw new Error('Student not found');

  const studentClass = student.classes.find(c => c.classId.toString() === classId.toString());

  if (!studentClass) throw new Error('Class not found for the student');

  studentClass.grades = studentClass.grades.filter(g => g.subject !== subject);
  return await Student.findByIdAndUpdate(studentId, { classes: student.classes }, { new: true });
};

export const getClassStudents = async (classId: string) => {
    const classData = await Class.findById(classId).populate('studentIds');
  
    if (!classData) throw new Error('Class not found');
  
    return classData.studentIds};
