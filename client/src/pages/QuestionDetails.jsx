import React, { useEffect } from "react";

const QuestionDetails = ({ question }) => {
  useEffect(() => {
    console.log("Received question:", question);
  }, [question]);

  return (
    <div>
      <div>
        Quote: {question.quote_text}
      </div>
      <div>
        Correct Answer: {question.solution_char}
      </div>
      <div>
        Your Answer: {question.user_answer}
      </div>
      <div>
        Result: {question.user_answer === question.solution_char ? (
          <span className="correct">Correct</span>
        ) : (
          <span className="false">False</span>
        )}
      </div>
    </div>
  );
};

export default QuestionDetails;
