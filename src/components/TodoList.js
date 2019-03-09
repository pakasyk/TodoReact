import React, { Component } from "react";

class TodoList extends Component {
  state = {
    selected: null,
    inputEdit: ""
  };

  onEditClick = todo => {
    this.setState({
      selected: todo,
      inputEdit: todo
    });
  };

  onEditSubmit = (e, i) => {
    e.preventDefault();
    console.log("state.inputEdit:");
    
    console.log(this.state.inputEdit);
    
    this.props.onFormSubmit(this.state.inputEdit, i);
    this.setState({ selected: "" });
  };

  render() {
    console.log(this.props.todos);

    let todos = this.props.todos.map((todo, i) => {
      if (todo === this.state.selected) {
        return (
          <tr key={i} className="table-warning">
            <th scope="row">{i + 1}</th>
            <td>
              <form onSubmit={e => this.onEditSubmit(e, i)}>
                <input
                  autoFocus
                  type="text"
                  value={this.state.inputEdit.term}
                  onChange={e => {
                    return this.setState({ inputEdit: {term: e.target.value, uid: todo.uid, done: todo.done, order: todo.order || 0, id: todo.id}})
                  }}
                />
              </form>
            </td>
            <td>
              <button
                type="submit"
                className="btn btn-success btn-sm"
                onClick={e => this.onEditSubmit(e, i)}
              >
                <i className="fas fa-save" />
              </button>
            </td>
          </tr>
        );
      } else if (todo.done === false){
        return (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{todo.term}</td>
            <td>
              <button
                type="submit"
                className="btn btn-dark btn-sm"
                onClick={() => this.props.onDoneClick(i)}
              >
                <i className="fas fa-check"></i>
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                onClick={() => this.onEditClick(todo)}
              >
                <i className="fas fa-pen" />
              </button>
              <button
                type="submit"
                className="btn btn-danger btn-sm"
                onClick={() => this.props.onDeleteClick(i)}
              >
                <i className="fas fa-trash" />
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={i} className="table-secondary">
            <th scope="row">{i + 1}</th>
            <td>{todo.term}</td>
            <td>
              <button
                type="submit"
                className="btn btn-dark btn-sm"
                onClick={() => this.props.onUnDoneClick(i)}
              >
                <i className="fas fa-undo"></i>
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                onClick={() => this.onEditClick(todo)}
              >
                <i className="fas fa-pen" />
              </button>
              <button
                type="submit"
                className="btn btn-danger btn-sm"
                onClick={() => this.props.onDeleteClick(i)}
              >
                <i className="fas fa-trash" />
              </button>
            </td>
          </tr>
        );
      }
    });
    return (
      <table className="table table-light">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">ToDo</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{todos}</tbody>
      </table>
    );
  }
}

export default TodoList;
