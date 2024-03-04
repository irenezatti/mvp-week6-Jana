import React from "react";
import { Link } from "react-router-dom";
import gollum_unhappy from "../assets/gollum_unhappy.png";

export default function YouWin() {
  return (
    <>
      <h1 className="shrikhand-regular">you win!</h1>
      <p>Now grab the ring an run! </p>
      <img className="resultimgs" src={gollum_unhappy}></img>
      <div>
        <button>
          <Link to="/">New game</Link>
        </button>
      </div>
    </>
  );
}