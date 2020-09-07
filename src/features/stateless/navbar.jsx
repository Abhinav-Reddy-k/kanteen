import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

class NavBar extends Component {
  render() {
    const navClass =
      "navbar fixed-top navbar-expand-lg navbar-light nav-color bm";
    return (
      <Fragment>
        <nav className={navClass} id="nav">
          <Link className="navbar-brand" to="/login">
            Kanteen
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default NavBar;
