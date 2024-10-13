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
exports.getStudentController = void 0;
const studentService_1 = require("../services/studentService");
const getStudentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield (0, studentService_1.getStudentByEmail)(req.params.id);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving student', error });
    }
});
exports.getStudentController = getStudentController;
