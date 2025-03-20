/**
 * @swagger
 * tags:
 *   name: Biodata
 *   description: Biodata management endpoints
 */
import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
    createBiodata,
    deleteBiodata,
    getAllBiodata,
    getBiodataById,
    updateBiodata,
} from "../controllers/biodata.controllers.js";

const router = express.Router();

/**
 * @swagger
 * /biodata:
 *   post:
 *     summary: Create a new biodata
 *     tags: [Biodata]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               age:
 *                 type: integer
 *                 example: 25
 *               address:
 *                 type: string
 *                 example: 123 Main Street, City, Country
 *     responses:
 *       201:
 *         description: Biodata created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/", auth, createBiodata);

/**
 * @swagger
 * /biodata/{id}:
 *   get:
 *     summary: Get biodata by ID
 *     tags: [Biodata]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the biodata
 *     responses:
 *       200:
 *         description: Biodata found
 *       404:
 *         description: Biodata not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", auth, getBiodataById);

/**
 * @swagger
 * /biodata:
 *   get:
 *     summary: Get all biodata records
 *     tags: [Biodata]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all biodata
 *       500:
 *         description: Internal server error
 */
router.get("/", auth, getAllBiodata);

/**
 * @swagger
 * /biodata/{id}:
 *   put:
 *     summary: Update biodata by ID
 *     tags: [Biodata]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the biodata
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe Updated
 *               age:
 *                 type: integer
 *                 example: 26
 *               address:
 *                 type: string
 *                 example: 456 Another Street, City, Country
 *     responses:
 *       200:
 *         description: Biodata updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Biodata not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", auth, updateBiodata);

/**
 * @swagger
 * /biodata/{id}:
 *   delete:
 *     summary: Delete biodata by ID
 *     tags: [Biodata]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the biodata
 *     responses:
 *       200:
 *         description: Biodata deleted successfully
 *       404:
 *         description: Biodata not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", auth, deleteBiodata);

export default router;
