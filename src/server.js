import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 FORCE dotenv to load backend/.env explicitly
dotenv.config({ path: path.join(__dirname, "../.env") });

import express from "express";
import cors from "cors";
import connectDB from "../src/config/db.config.js";
import protect from "./middlewares/protect.middleware.js";

import authRouter from "./routes/auth.routes.js";
import sessionRouter from "./routes/session.routes.js";
import questionsRouter from "./routes/questions.routes.js";
import { generateInterviewQuestions, generateConceptExplanation } from "./controllers/ai.controller.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
