const mongoose = require("mongoose");
require("dotenv").config();

const Todo = require("./src/todos/todos.model");

const todos = require("./content.json");

function buildTodo(todos) {
  return {
    title:todos.title,
    details:todos.details,
    user:todos.user,
    creationDate:todos.creationDate,
    deadline:todos.deadline,
    isDone:todos.isDone
};
}

async function importBulkTodos() {
  const todosArray = todos.map((todos) =>
    buildLocation(todos)
  );
  await Todo.insertMany(todosArray);
}
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Import script connected to database, starting import.");
  await importBulkTodos();
  console.log("Finished importing.");
}

main();
