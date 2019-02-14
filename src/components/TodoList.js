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
    this.props.onFormSubmit(this.state.inputEdit, i);
    this.setState({ selected: "" });
  };

  render() {
    console.log(this.props.todos);

    let todos = this.props.todos.map((todo, i) => {
      if (todo === this.state.selected) {
        return (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>
              <form onSubmit={e => this.onEditSubmit(e, i)}>
                <input
                  autoFocus
                  type="text"
                  value={this.state.inputEdit}
                  onChange={e => this.setState({ inputEdit: e.target.value })}
                />
              </form>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={e => this.onEditSubmit(e, i)}
              >
                <i className="fas fa-save" />
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{todo}</td>
            <td>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => this.onEditClick(todo)}
              >
                <i className="fas fa-pen" />
              </button>
              <button
                type="button"
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
      <table className="table">
        <thead>
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
