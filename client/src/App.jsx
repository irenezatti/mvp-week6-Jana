import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Result from "./pages/Result";
import Page404 from "./pages/Page404";
import YouWin from "./pages/YouWin";
import YouLose from "./pages/YouLose";
import header_logo from "./assets/header_logo.png";
import { Link } from "react-router-dom";
import Login from "./pages/Login"; // add register page too different endpoint ofc


function App() {
  return (
    <>
      <div>
        <Link to="/">
          <img className="header-img" src={header_logo}></img>
        </Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/result" element={<Result />} />
          <Route path="/youwin" element={<YouWin />} />
          <Route path="/youlose" element={<YouLose />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Page404 />} />
          
        </Routes>
        <footer>
          <span>Coded by </span>
          <a href="https://github.com/janizzllle" target="_blank">
            janizzllle
          </a>
        </footer>
      </div>
      <img
        className="footer-img"
        src="https://www.theonering.net/torwp/wp-content/themes/The-One-Ring-2020/img/footer-bg-fellowship.svg"
      ></img>
      {/* <div className="circle"></div> */}
    </>
  );
}

export default App;
