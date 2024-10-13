"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("../controllers/teacherController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/teachers/grades/add:
 *   post:
 *     summary: Add a new grade (Teacher only)
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               subject:
 *                 type: string
 *               score:
 *                 type: number
 *     responses:
 *       201:
 *         description: Grade added successfully
 *       403:
 *         description: Forbidden (Teacher only)
 */
router.post('/grades/add', auth_1.authenticateToken, (0, auth_1.authorizeRole)('teacher'), teacherController_1.addGradeController);
/**
 * @swagger
 * /api/teachers/grades/update:
 *   put:
 *     summary: Update a student's grade (Teacher only)
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               subject:
 *                 type: string
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: Grade updated successfully
 *       403:
 *         description: Forbidden (Teacher only)
 */
router.put('/grades/update', auth_1.authenticateToken, (0, auth_1.authorizeRole)('teacher'), teacherController_1.updateGradeController);
/**
 * @swagger
 * /api/teachers/grades/delete:
 *   delete:
 *     summary: Delete a student's grade (Teacher only)
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               subject:
 *                 type: string
 *     responses:
 *       200:
 *         description: Grade deleted successfully
 *       403:
 *         description: Forbidden (Teacher only)
 */
router.delete('/grades/delete', auth_1.authenticateToken, (0, auth_1.authorizeRole)('teacher'), teacherController_1.deleteGradeController);
exports.default = router;
