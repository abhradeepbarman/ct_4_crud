/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */
import express from "express";
import {
    loginController,
    logoutController,
    refreshAccessTokenController,
    registerController,
} from "../controllers/auth.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or missing fields
 *       500:
 *         description: Internal server error
 */
router.post("/register", registerController);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User does not exist
 *       500:
 *         description: Internal server error
 */
router.post("/login", loginController);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal server error
 */
router.post("/logout", auth, logoutController);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI...
 *     responses:
 *       200:
 *         description: New access token generated
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Internal server error
 */
router.post("/refresh", refreshAccessTokenController);

export default router;
