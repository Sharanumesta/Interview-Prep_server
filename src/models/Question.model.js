import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
    question: String,
    answer: String,
    note: String,
    description: String,
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionsSchema);

export default Question;
