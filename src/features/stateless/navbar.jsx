import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

class NavBar extends Component {
  render() {
    const user = getCurrentUser();
    const navClass = "navbar fixed-top navbar-expand-lg navbar-dark bg-dark bm";
    return (
      <Fragment>
        <nav className={navClass} id="nav">
          <Link className="navbar-brand" to="/">
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
            <ul className="navbar-nav">
              {user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">
                    My Orders
                  </Link>
                </li>
              )}
              {!user && (
                <Fragment>
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
                </Fragment>
              )}
              {user && (
                <Fragment>
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        {user.name}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/logout">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </Fragment>
              )}
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default NavBar;
