import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import {
  questionAnswerPrompt,
  conceptExplainPrompt,
} from "../utils/prompts.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// @desc Generate interview question and answers using gemini
// @route POST /api/ai/generate-questions
// @access Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    let rawText = response.text;

    // Cleanup fenced code blocks
    const cleanedText = rawText
      .replace(/```json/g, "") // remove string json
      .replace(/```/g, "") // remove ending
      .trim(); // remove extra spaces

    // Parse JSON
    const data = JSON.parse(cleanedText);

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc   Explain interview question
// @route  POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question)
      return res.status(200).json({ message: "Missing required fields" });
    const prompt = conceptExplainPrompt(question);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });  

    let rawText = response.text;
    // Cleanup fenced code blocks
    const cleanedText = rawText
      .replace(/```json/g, "") // remove string json
      .replace(/```/g, "") // remove ending
      .trim(); // remove extra spaces

    // Parse JSON
    const data = JSON.parse(cleanedText);

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

export { generateInterviewQuestions, generateConceptExplanation };
