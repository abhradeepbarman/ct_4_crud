import express from "express";
import {
    loginController,
    logoutController,
    refreshAccessTokenController,
    registerController,
} from "../controllers/auth.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", auth, logoutController);
router.post("/refresh", refreshAccessTokenController);

export default router;