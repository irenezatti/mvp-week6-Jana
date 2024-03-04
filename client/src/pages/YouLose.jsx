import React from "react";
import { Link } from "react-router-dom";
import gollum_happy from "../assets/gollum_happy.jpeg";

export default function YouLose() {
  return (
    <>
      <h1 className="shrikhand-regular">you lose!</h1>
      <p>Now you will stay here with Gollum forever...</p>
      <img className="resultimgs" src={gollum_happy}></img>
      <div>
        <button>
          <Link to="/">New game</Link>
        </button>
      </div>
    </>
  );
}