import React, { Component } from "react";
import fire from "../firebase/config";
import { BrowserRouter as Route, Redirect } from "react-router-dom";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    errorMsg: null
   
  };

  onSignupSubmit = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => this.setState({errorMsg: err.message}));
  };

  render() {
    if (this.props.user) {
        return <Redirect to="/todo" />;
      }
    return (
      <form onSubmit={this.onSignupSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value, errorMsg: null })}
          />
          <small id="emailHelp" className="form-text text-muted">
            Don't worry, I won't use your email.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value, errorMsg: null })}
          />
           <small className="d-block text-danger">
            {this.state.errorMsg}
          </small>
        </div>

        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    );
  }
}

export default Signup;
