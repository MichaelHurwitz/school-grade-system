import { Router } from 'express';
import { getStudentController } from '../controllers/studentController';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();

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
router.get('/:id', authenticateToken, authorizeRole('student'), getStudentController);

export default router;
