import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile", protect, getUserProfile);

export default router;
