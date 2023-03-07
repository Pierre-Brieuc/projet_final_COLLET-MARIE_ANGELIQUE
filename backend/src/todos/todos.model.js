const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  details: String,
  user: String,
  creationDate: Date,
  Deadline: Date,
  isDone: Boolean
});

const Todo = mongoose.model("Location", todoSchema);

module.exports = Todo;
