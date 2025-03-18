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

router.post("/", auth, createBiodata);
router.get("/:id", auth, getBiodataById);
router.get("/", auth, getAllBiodata);
router.put("/:id", auth, updateBiodata);
router.delete("/:id", auth, deleteBiodata);

export default router;
