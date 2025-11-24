import { Router } from "express";
import protect from "../middlewares/protect.middleware.js";
import {
  addQuestionsToSession,
  togglePinQuestion,
  updateQuestionNote,
} from "../controllers/questions.controller.js";

const router = Router();

router.post("/add", protect, addQuestionsToSession);
router.post("/:id/pin", protect, togglePinQuestion);
router.post("/:id/note", protect, updateQuestionNote);

export default router;
