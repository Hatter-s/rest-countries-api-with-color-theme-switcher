import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Moon from "../icon/moon";
import MoonFill from "../icon/moon-fill";
import { MainContext } from "../../context/MainContext";

import "./Navbar.scss";

export default function Navbar() {
  const { darkMode, setDarkMode } = useContext(MainContext);

  return (
    <>
      <nav className="navbar element">
        <div className="container">
          <Link to="/" className="brand">Where in the world?</Link>
          <button onClick={() => { setDarkMode(!darkMode) }} className="dark-mode-toggle">
            <i>
              {darkMode ? <MoonFill /> : <Moon />}
            </i>
            Dark Mode
          </button>
        </div>

      </nav>
    </>
  )
}