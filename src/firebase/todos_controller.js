import { db } from "./config";

export const getAllTodos = uid =>
  db.collection("todos").where("uid", "==", uid);
export const createTodo = todo => db.collection("todos").add(todo);
export const editTodo = todo =>
  db
    .collection("todos")
    .doc(todo.id)
    .update(todo);
export const deleteTodo = todo =>
  db
    .collection("todos")
    .doc(todo.id)
    .delete();
