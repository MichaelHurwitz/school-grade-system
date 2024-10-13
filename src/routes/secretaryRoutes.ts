import { Router } from 'express';
import { createUserController, updateUserController, deleteUserController } from '../controllers/secretaryController';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import { Role } from '../models/secretary';

const router = Router();

/**
 * @swagger
 * /api/secretary/users:
 *   post:
 *     summary: Create a new user (Secretary only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [teacher, student, secretary]
 *     responses:
 *       201:
 *         description: User created successfully
 *       403:
 *         description: Forbidden (Secretary only)
 */
router.post('/users', authenticateToken, authorizeRole(Role.Secretary), createUserController);

/**
 * @swagger
 * /api/secretary/users/{id}:
 *   put:
 *     summary: Update a user (Secretary only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       403:
 *         description: Forbidden (Secretary only)
 */
router.put('/users/:id', authenticateToken, authorizeRole(Role.Secretary), updateUserController);

/**
 * @swagger
 * /api/secretary/users/{id}:
 *   delete:
 *     summary: Delete a user (Secretary only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Forbidden (Secretary only)
 */
router.delete('/users/:id', authenticateToken, authorizeRole(Role.Secretary), deleteUserController);

export default router;
