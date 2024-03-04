import React from "react";
import { Link } from "react-router-dom";
import QuestionDetails from "./QuestionDetails";
import gollum_unhappy from "../assets/gollum_unhappy.png";

const YouWin = ({ questions }) => (
  <>
    <h1 className="shrikhand-regular">You Win!</h1>
    <p>Now grab the ring and run! </p>
    <img className="resultimgs" src={gollum_unhappy} alt="Gollum unhappy"></img>
    
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

export default YouWin;
