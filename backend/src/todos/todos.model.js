const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  details:{
    type:String,
    required: true
  },
  user: {
    type:String,
    required: true
  },
  creationDate: Date,
  Deadline: Date,
  isDone: Boolean
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
