import React, { useEffect, useState } from "react";
import YouLose from "./YouLose";
import YouWin from "./YouWin";
import QuestionDetails from "./QuestionDetails"; // Make sure you have this component

export default function Result() {
  const [result, setResult] = useState();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getMaxId();
  }, []);

  const getMaxId = async () => {
    try {
      const response = await fetch(`/api/games/`);
      const data = await response.json();
      let index = data.length;
      getResult(data[index - 1].id);
      getQuestions(data[index - 1].id);
    } catch (err) {
      console.log(err);
    }
  };

  const getResult = async (id) => {
    try {
      const response = await fetch(`/api/games/${id}/sum`);
      const data = await response.json();
      setResult(data[0].total);
    } catch (err) {
      console.log(err);
    }
  };

  const getQuestions = async (id) => {
    try {
      const response = await fetch(`/api/games/${id}/questions`);
      const data = await response.json();
      console.log("Received questions:", data); // Add this line to log the data
      setQuestions(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3 className="shrikhand-regular">You got {result} correct answers</h3>
      
      <div>
        <h3>Details of each question:</h3>
        {questions.map((question, index) => (
          <QuestionDetails key={index} question={question} />
        ))}
      </div>

      {result > 3 ? <YouWin questions={questions} /> : <YouLose questions={questions} />}
    </>
  );
}
