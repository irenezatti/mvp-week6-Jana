import React from "react";
import { Link } from "react-router-dom";
import QuestionDetails from "./QuestionDetails";
import gollum_happy from "../assets/gollum_happy.jpeg";

const YouLose = ({ questions }) => (
  <>
    <h1 className="shrikhand-regular">You Lose!</h1>
    <p>Now you will stay here with Gollum forever...</p>
    <img className="resultimgs" src={gollum_happy} alt="Gollum happy"></img>
    
    <div>
      <h3>Details of each question:</h3>
      {questions.map((question, index) => (
        <QuestionDetails key={index} question={question} />
      ))}
    </div>
    
    <div>
      <button>
        <Link to="/">New game</Link>
      </button>
    </div>
  </>
);

export default YouLose;
