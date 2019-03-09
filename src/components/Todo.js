import React, { Component } from "react";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";
import * as todosDB from "../firebase/todos_controller";

class Todo extends Component {
  state = {
    todos: [],
    selected: null
  };

  onInputSave = term => {
    let todo = this.state.todos.slice();
    todo.push({
      uid: this.props.user.uid,
      term: term,
      done: false,
      order: todo.length ? todo[todo.length - 1].order + 1 : 0
    });
    this.setState({ todos: todo });
    todosDB.createTodo({
      uid: this.props.user.uid,
      term: term,
      done: false,
      order: todo[todo.length - 1].order
    });
  };

  onDelete = i => {
    console.log("delete");

    let todo = this.state.todos.slice();
    todosDB.deleteTodo(todo[i]);
    todo.splice(i, 1);
    this.setState({ todos: todo });
  };

  onDone = i => {
    console.log("done");
    let todo = this.state.todos.slice();
    todo[i].done = true;
    // this.setState({ todos: todo });
    this.onEditSave(todo[i], i);
  };
  onUnDone = i => {
    console.log("undone");
    let todo = this.state.todos.slice();
    todo[i].done = false;
    // this.setState({ todos: todo });
    this.onEditSave(todo[i], i);
  };

  loadTodos = () => {
    console.log("LOAD");
    
    console.log(this.props.user.uid);
    
    let stateTodos = [];
    todosDB
      .getAllTodos(this.props.user.uid)
      // .orderBy("order", "asc")
      .get()
      .then(res => {
        res.docs.map(doc => stateTodos.push({ id: doc.id, ...doc.data() }));
        this.setState({ todos: stateTodos });
      })
      .catch(err => console.log(err));
  };

  onEditSave = (term, i) => {
    console.log("edit");
    console.log(term);
    if (!term.id) {
      let stateTodos = [];
      todosDB
        .getAllTodos(this.props.user.uid)
        .orderBy("order", "asc")
        .get()
        .then(res => {
          res.docs.map(doc => stateTodos.push({ id: doc.id, ...doc.data() }));
          stateTodos[i] = { ...term, id: stateTodos[i].id };
          this.setState({ todos: stateTodos });
          todosDB.editTodo(stateTodos[i]);
        });
    } else {
      let todo = this.state.todos.slice();
      todo[i] = term;
      this.setState({ todos: todo });
      todosDB.editTodo(term);
    }
  };

  componentDidMount = () => {
    this.loadTodos();
  };

  render() {
    return (
      <div>
        <InputTodo onFormSubmit={this.onInputSave} />
        <TodoList
          todos={this.state.todos}
          onFormSubmit={this.onEditSave}
          onDeleteClick={this.onDelete}
          onDoneClick={this.onDone}
          onUnDoneClick={this.onUnDone}
        />
      </div>
    );
  }
}
export default Todo;
