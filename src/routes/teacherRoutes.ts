import { Router } from 'express';
import { addGradeController, updateGradeController, deleteGradeController } from '../controllers/teacherController';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();

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
router.post('/grades/add', authenticateToken, authorizeRole('teacher'), addGradeController);

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
router.put('/grades/update', authenticateToken, authorizeRole('teacher'), updateGradeController);

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
router.delete('/grades/delete', authenticateToken, authorizeRole('teacher'), deleteGradeController);

export default router;
