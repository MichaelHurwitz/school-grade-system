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
exports.deleteUserController = exports.updateUserController = exports.createUserController = void 0;
const secretaryService_1 = require("../services/secretaryService");
const teacherService_1 = require("../services/teacherService");
const studentService_1 = require("../services/studentService");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.body;
        if (!role) {
            res.status(400).json({ message: 'Role is required' });
            return;
        }
        let newUser;
        if (role === 'secretary') {
            newUser = yield (0, secretaryService_1.createSecretary)(req.body);
        }
        else if (role === 'teacher') {
            newUser = yield (0, teacherService_1.createTeacher)(req.body);
        }
        else if (role === 'student') {
            newUser = yield (0, studentService_1.createStudent)(req.body);
        }
        else {
            res.status(400).json({ message: 'Invalid role specified' });
            return;
        }
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});
exports.createUserController = createUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.body;
        const userId = req.params.id;
        let updatedUser;
        if (role === 'secretary') {
            updatedUser = yield (0, secretaryService_1.updateSecretary)(userId, req.body);
        }
        else if (role === 'teacher') {
            updatedUser = yield (0, teacherService_1.updateTeacher)(userId, req.body);
        }
        else if (role === 'student') {
            updatedUser = yield (0, studentService_1.updateStudent)(userId, req.body);
        }
        else {
            res.status(400).json({ message: 'Invalid role specified' });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.body;
        const userId = req.params.id;
        if (!role) {
            res.status(400).json({ message: 'Role is required' });
            return;
        }
        if (role === 'secretary') {
            yield (0, secretaryService_1.deleteSecretary)(userId);
        }
        else if (role === 'teacher') {
            yield (0, teacherService_1.deleteTeacher)(userId);
        }
        else if (role === 'student') {
            yield (0, studentService_1.deleteStudent)(userId);
        }
        else {
            res.status(400).json({ message: 'Invalid role specified' });
            return;
        }
        res.status(200).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} deleted successfully` });
    }
    catch (error) {
        res.status(500).json({ message: `Error deleting`, error });
    }
});
exports.deleteUserController = deleteUserController;
