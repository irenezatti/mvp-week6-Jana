import React, { useEffect, useState } from "react";
import YouLose from "./YouLose";
import YouWin from "./YouWin";

export default function Result() {
  const [result, setResult] = useState();
  const [q1, setQ1] = useState();
  const [q2, setQ2] = useState();
  const [q3, setQ3] = useState();
  const [q4, setQ4] = useState();
  const [q5, setQ5] = useState();

  useEffect(() => {
    getMaxId();
  }, []);

  const getMaxId = async () => {
    try {
      const response = await fetch(`/api/games/`);
      // console.log(response);
      const data = await response.json();
      let index = data.length;
      getResult(data[index - 1].id);
      getAnswer(data[index - 1].id);
    } catch (err) {
      console.log(err);
    }
  };
  const getResult = async (id) => {
    try {
      const response = await fetch(`/api/games/${id}/sum`);
      const data = await response.json();
      // console.log(data[0].total);
      setResult(data[0].total);
    } catch (err) {
      console.log(err);
    }
  };

  const getAnswer = async (id) => {
    try {
      const response = await fetch(`/api/games/${id}`);
      const data = await response.json();
      // let q = `q${q}`;
      setQ1(data[0].Q1);
      setQ2(data[0].Q2);
      setQ3(data[0].Q3);
      setQ4(data[0].Q4);
      setQ5(data[0].Q5);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3 className="shrikhand-regular">You got {result} correct answers</h3>
      <div className="answer-overview row">
        <div className="col">
          <div>
            Question 1:{" "}
            {q1 === 1 ? (
              <span className="correct">Correct</span>
            ) : (
              <span className="false">False</span>
            )}
          </div>
          <div>
            Question 2:{" "}
            {q2 === 1 ? (
              <span className="correct">Correct</span>
            ) : (
              <span className="false">False</span>
            )}
          </div>
          <div>
            Question 3:{" "}
            {q3 === 1 ? (
              <span className="correct">Correct</span>
            ) : (
              <span className="false">False</span>
            )}
          </div>
        </div>
        <div className="col">
          <div>
            Question 4:{" "}
            {q4 === 1 ? (
              <span className="correct">Correct</span>
            ) : (
              <span className="false">False</span>
            )}
          </div>
          <div>
            Question 5:{" "}
            {q5 === 1 ? (
              <span className="correct">Correct</span>
            ) : (
              <span className="false">False</span>
            )}
          </div>
        </div>
      </div>

      {result > 3 ? <YouWin /> : <YouLose />}

      {/* <div>
        Click here to reveal your ending:
        <div>
          {result > 2 ? (
            <Link to={`/YouWin`}> Result</Link>
          ) : (
            <Link to={`/YouLose`}> Result</Link>
          )}
        </div> 
      </div>*/}
    </>
  );
}