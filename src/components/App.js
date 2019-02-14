import React, { Component } from "react";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";

class App extends Component {
  state = {
    todos: [],
    selected: null
  };

  onInputSave = term => {
    let todo = this.state.todos.slice();
    todo.push(term);
    this.setState({ todos: todo });
  };

  onEditSave = (term, i) => {
    let todo = this.state.todos.slice();
    todo[i] = term;
    this.setState({ todos: todo });
  };

  onDelete = i => {
    console.log("delete");
    console.log(i);

    let todo = this.state.todos.slice();
    console.log(todo[i]);

    todo.splice(i, 1);
    this.setState({ todos: todo });
  };

  render() {
    return (
      <div className="container">
        <InputTodo onFormSubmit={this.onInputSave} />
        <TodoList
          todos={this.state.todos}
          onFormSubmit={this.onEditSave}
          onDeleteClick={this.onDelete}
        />
      </div>
    );
  }
}

export default App;
