import { Router } from "express";
import protect from "../middlewares/protect.middleware.js";
import {
  createSession,
  getMySessions,
  getSessionById,
  deleteSession,
} from "../controllers/session.controller.js";

const router = Router();

router.post("/create", protect, createSession);
router.get("/my-sessions", protect, getMySessions);
router.get("/:id", protect, getSessionById);
router.delete("/:id", protect, deleteSession);

export default router;
