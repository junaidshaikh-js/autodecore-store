import { FaBars, FaTimes } from "react-icons/fa";

import { SearchBox } from "./SearchBox";
import { NavButtons } from "./NavButtons";

import "./header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFixBody } from "../../hooks";
import { useAuth, useData } from "../../context";

import { BtnIcon } from "../buttons";

export function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  function toggleSideMenu() {
    setIsSideMenuOpen((s) => !s);
  }
  useFixBody(isSideMenuOpen);

  const {
    state: { userName, token },
    handleLogout,
  } = useAuth();

  const { dispatch: dataDispatch } = useData();

  return (
    <header>
      <div className="hy-header-wrapper">
        <nav className="hy-navbar px-sm pb-sm pt-1">
          <div className="hy-navbar-links-container  mb-sm">
            <div className="align-center">
              <BtnIcon cnames="btn hy-hamburger-btn" onClick={toggleSideMenu}>
                <FaBars />
              </BtnIcon>
              <Link to="/">
                <div className="hy-logo">
                  <span>
                    Auto<span style={{ color: "#FFDE59" }}>Decore</span>
                  </span>
                </div>
              </Link>
            </div>
            <NavButtons />
          </div>
          <SearchBox />
        </nav>
      </div>

      <div className={`side-menu ${isSideMenuOpen ? "isOpen" : null}`}>
        <div>
          <img
            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_4811a1.svg"
            alt=""
            className="ml-1"
          />

          <span className="side-menu-close-btn" onClick={toggleSideMenu}>
            <FaTimes color="white" fontSize="1.4rem" />
          </span>
        </div>

        <ul onClick={toggleSideMenu}>
          {token ? (
            <li className="my-sm">Hi, {userName} </li>
          ) : (
            <>
              <li className="my-sm">
                <Link to="/login">
                  <button className="btn">Login</button>
                </Link>
              </li>

              <li className="my-sm">
                <Link to="/signup">
                  <button className="btn">Signup</button>
                </Link>
              </li>
            </>
          )}

          {token && (
            <li className="my-sm" onClick={() => handleLogout(dataDispatch)}>
              <button className="btn">Logout</button>
            </li>
          )}

          <li className="my-sm">
            <button className="btn">Settings</button>
          </li>
        </ul>
      </div>
    </header>
  );
}
