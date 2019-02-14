import React, { Component } from "react";

class InputTodo extends Component {
  state = {
    term: ""
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.onFormSubmit(this.state.term);
    this.setState({ term: "" });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          autoFocus
          className="form-control"
          type="text"
          name="inputTodo"
          id="inputTodo"
          placeholder="enter todo"
          value={this.state.term}
          onChange={e => this.setState({ term: e.target.value })}
        />
      </form>
    );
  }
}

export default InputTodo;
