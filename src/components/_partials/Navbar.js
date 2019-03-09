import React, { Component } from "react";
import { BrowserRouter as Route, NavLink, Link } from "react-router-dom";
import fire from "../../firebase/config";

class Navbar extends Component {
  state = {};

  onLogoutClick = e => {
    fire.auth().signOut();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          ToDo
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
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/todo">
                Todo
              </NavLink>
            </li>
           
            {!this.props.user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </li>
            ) : (
              <></>
            )}

            
          </ul>
          {this.props.user ? (
            <div className="ml-auto">
              <span className="mr-2">{this.props.user.email}</span>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={this.onLogoutClick}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="ml-auto btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
