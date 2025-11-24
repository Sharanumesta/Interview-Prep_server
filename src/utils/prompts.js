const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
    You are an AI trained to generate technical interview questions and answers.

    Tasks:
    - Role: ${role}.
    - Candidate Experience: ${experience} years.
    - Focus Topics: ${topicsToFocus}.
    - Write ${numberOfQuestions} interview questions.
    - Fro each question, generate a detailed but beginner-friendly answer.
    - If the answer needs a code example, add a small code block inside.
    - Keep formatting very clean.
    - Return a pure JSON array like:
    [
        {
            "question": "Question here?",
            "answer": "Answer here."
        },
        ...
    ]

    Important: Do NOT add any extra text. Only return valid JSON.
    `;

const conceptExplainPrompt = (question) => `
    You are an AI trained to generate explanations for a given interview question.

    Task:
    - Explain the following interview question and its underlying concept in depth as if teaching a beginner developer.
    - Question: "${question}"
    - After the explanation, provide a short and clear title that summarizes the concept for use as an article or page header.
    - If the explanation includes a code example, include a small code block.
    - Keep the formatting clean and clear.
    - Return the result as a valid JSON object with the following structure:
    {
        "title": "Short title here?",
        "explanation": "Explanation here."
    }

    Important: Do NOT add any extra text outside the JSON. Only return valid JSON.
`;

export { questionAnswerPrompt, conceptExplainPrompt };
