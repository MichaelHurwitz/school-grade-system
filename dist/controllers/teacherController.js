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
exports.getClassStudentsController = exports.deleteGradeController = exports.updateGradeController = exports.addGradeController = void 0;
const teacherService_1 = require("../services/teacherService");
const addGradeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, subject, score, classId } = req.body;
        const updatedStudent = yield (0, teacherService_1.addGrade)(studentId, subject, score, classId);
        res.status(200).json(updatedStudent);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding grade', error });
    }
});
exports.addGradeController = addGradeController;
const updateGradeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, subject, newScore, classId } = req.body;
        const updatedStudent = yield (0, teacherService_1.updateGrade)(studentId, subject, newScore, classId);
        res.status(200).json(updatedStudent);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating grade', error });
    }
});
exports.updateGradeController = updateGradeController;
const deleteGradeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, subject, classId } = req.body;
        const updatedStudent = yield (0, teacherService_1.deleteGrade)(studentId, subject, classId);
        res.status(200).json(updatedStudent);
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting grade', error });
    }
});
exports.deleteGradeController = deleteGradeController;
const getClassStudentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classId } = req.params;
        const students = yield (0, teacherService_1.getClassStudents)(classId);
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
});
exports.getClassStudentsController = getClassStudentsController;
