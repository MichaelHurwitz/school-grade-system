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
exports.getStudentByEmail = exports.deleteStudent = exports.updateStudent = exports.createStudent = void 0;
const student_1 = require("../models/student");
const createStudent = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const newStudent = new student_1.Student(studentData);
    return yield newStudent.save();
});
exports.createStudent = createStudent;
const updateStudent = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield student_1.Student.findByIdAndUpdate(id, updateData, { new: true });
});
exports.updateStudent = updateStudent;
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield student_1.Student.findByIdAndDelete(id);
});
exports.deleteStudent = deleteStudent;
const getStudentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield student_1.Student.findOne({ email });
});
exports.getStudentByEmail = getStudentByEmail;
