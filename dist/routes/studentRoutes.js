"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get student details (Student only)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student ID
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *       403:
 *         description: Forbidden (Student only)
 */
router.get('/:id', auth_1.authenticateToken, (0, auth_1.authorizeRole)('student'), studentController_1.getStudentController);
exports.default = router;
