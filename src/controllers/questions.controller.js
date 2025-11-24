import Question from "../models/Question.model.js";
import Session from "../models/Session.model.js";

// @desc   Add addition question to an existing session
// @route  POST /api/questions/add
// @access Private
const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    if (!sessionId || !questions || !Array.isArray(questions))
      return res.status(400).json({ message: "Invalid input data" });

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // Create new Questions
    const createQuestion = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Update session to include new session IDs
    session.questions.push(...createQuestion.map((q) => q._id));
    await session.save();

    return res.status(201).json(createQuestion);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Pin or Unpin a question
// @route  POST /api/questions/:id/pin
// @access Private
const togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res
        .status(400)
        .json({ success: false, message: "Question not found" });

    question.isPinned = !question.isPinned;
    await question.save();

    return res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Update a note for a question
// @route  POST /api/questions/:id/note
// @access Private
const updateQuestionNote = async (req, res) => {
  try {
    const {note } = req.body;
    const question = await Question.findById(req.params.id);
    if(!question) return res.status(404).json({success: false, message : "Question not found"});

    question.note = note || "";
    await question.save();

    return res.status(200).json({success : true, question});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { addQuestionsToSession, togglePinQuestion, updateQuestionNote };
