"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassStudents = exports.deleteGrade = exports.updateGrade = exports.addGrade = exports.getTeacherByEmail = exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = void 0;
const teacher_1 = require("../models/teacher");
const class_1 = require("../models/class");
const student_1 = require("../models/student");
const createTeacher = (teacherData) => __awaiter(void 0, void 0, void 0, function* () {
    const newStudent = new teacher_1.Teacher(teacherData);
    return yield newStudent.save();
});
exports.createTeacher = createTeacher;
const updateTeacher = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teacher_1.Teacher.findByIdAndUpdate(id, updateData, { new: true });
});
exports.updateTeacher = updateTeacher;
const deleteTeacher = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teacher_1.Teacher.findByIdAndDelete(id);
});
exports.deleteTeacher = deleteTeacher;
const getTeacherByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teacher_1.Teacher.findOne({ email });
});
exports.getTeacherByEmail = getTeacherByEmail;
const addGrade = (studentId, subject, score, classId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_1.Student.findById(studentId).lean();
    if (!student)
        throw new Error('Student not found');
    const studentClass = student.classes.find(c => c.classId.toString() === classId.toString());
    if (!studentClass)
        throw new Error('Class not found for the student');
    studentClass.grades.push({ subject, score });
    return yield student_1.Student.findByIdAndUpdate(studentId, { classes: student.classes }, { new: true });
});
exports.addGrade = addGrade;
const updateGrade = (studentId, subject, newScore, classId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_1.Student.findById(studentId).lean();
    if (!student)
        throw new Error('Student not found');
    const studentClass = student.classes.find(c => c.classId.toString() === classId.toString());
    if (!studentClass)
        throw new Error('Class not found for the student');
    const grade = studentClass.grades.find(g => g.subject === subject);
    if (!grade)
        throw new Error('Grade not found for the subject');
    grade.score = newScore;
    return yield student_1.Student.findByIdAndUpdate(studentId, { classes: student.classes }, { new: true });
});
exports.updateGrade = updateGrade;
const deleteGrade = (studentId, subject, classId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_1.Student.findById(studentId).lean();
    if (!student)
        throw new Error('Student not found');
    const studentClass = student.classes.find(c => c.classId.toString() === classId.toString());
    if (!studentClass)
        throw new Error('Class not found for the student');
    studentClass.grades = studentClass.grades.filter(g => g.subject !== subject);
    return yield student_1.Student.findByIdAndUpdate(studentId, { classes: student.classes }, { new: true });
});
exports.deleteGrade = deleteGrade;
const getClassStudents = (classId) => __awaiter(void 0, void 0, void 0, function* () {
    const classData = yield class_1.Class.findById(classId).populate('studentIds');
    if (!classData)
        throw new Error('Class not found');
    return classData.studentIds;
});
exports.getClassStudents = getClassStudents;
