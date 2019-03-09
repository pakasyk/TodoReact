import React, { Component } from "react";
import { BrowserRouter as Route, Redirect } from "react-router-dom";
import fire from "../firebase/config";
import Todo from "./Todo";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMsg: null,
    demo: false,
  };

  onLoginSubmit = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        console.log("redirect");
        console.log(this.state.redirect);

        return this.setState({ redirect: true });
      })
      .catch(err => this.setState({errorMsg: err.message}));
  };

  onDemoChange = e => {
      if (!this.state.demo){
        this.setState({demo: !this.state.demo, email: "demo@demo.demo", password: "demodemo"});
      } else {
        this.setState({demo: !this.state.demo, email: "", password: ""});
      }
    
    
  };

  render() {
    console.log("after render");
    console.log(this.props);

    if (this.props.user) {
      return <Redirect to="/todo" />;
    }
    return (
      <form onSubmit={this.onLoginSubmit}>
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
            If you're lazy to register check the Demo Account option.
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
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={this.onDemoChange}
            value={this.state.demo}
            
          />
          
          <label className="form-check-label" htmlFor="exampleCheck1">
            Demo Account
          </label>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    );
  }
}

export default Login;
