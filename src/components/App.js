import React, { Component } from "react";
import Todo from "./Todo";
import Login from "./Login";
import Navbar from "./_partials/Navbar";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import fire from "../firebase/config";
import Signup from "./Signup";

class App extends Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    this.authListener();
  };

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  };

  render() {
    return (
      <div className="container bg-light mt-5 pb-3" style={{minHeight: 500+"px"}}>
        <Router>
          <>
            <Navbar user={this.state.user} />
            <hr />

            <Switch>
              <Route exact path="/" component={Home} />

              <PrivateRoute
                path="/todo"
                component={Todo}
                user={this.state.user}
              />
              <Route
                exact
                path="/login"
                render={props => <Login {...props} user={this.state.user} />}
              />
              <Route
                exact
                path="/signup"
                render={props => <Signup {...props} user={this.state.user} />}
              />
             
              <Route render={() => <h1>Not Found</h1>} />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, user: User, ...rest }) => {
  console.log("PROPS");

  return (
    <Route
      {...rest}
      render={props => {
        console.log(User);

        return User ? (
          <Component {...props} user={User} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default App;
