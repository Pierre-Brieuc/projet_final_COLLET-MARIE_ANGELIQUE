// This file holds the Business-Logic layer, interacting with Data Layer

const Todo = require("./todos.model");
const { NotFoundError } = require("../custom-errors/not-found.error");
const { ValidationError } = require("../custom-errors/validation.error");

async function createOne(data) {
  const todo = new Todo(data);
  return todo.save();
}

/**
 * Find multiple todos with custom limit and offset (pagination)
 * @param limit
 * @param offset
 * @returns {Query<Array<HydratedDocument<unknown, {}, {}>>, Document<unknown, any, unknown> & unknown extends {_id?: infer U} ? IfAny<U, {_id: Types.ObjectId}, Required<{_id: U}>> : {_id: Types.ObjectId} & {}, {}, unknown> & {}}
 */
function findAll(limit = 20, offset = 0) {
  return Todo.find().limit(limit).skip(offset);
}

async function findOne(id) {
  let todo;
  try {
    todo = await Todo.findById(id);
  } catch (e) {
    console.error(e);
    throw new ValidationError(e.message);
  }
  if (!todo) {
    throw new NotFoundError("Todo not found");
  }
  return todo;
}

async function updateOne(id, data) {
  const todo = await findOne(id);
  for (const todoElementKey in data) {
    if (
      todoElementKey[0] !== "_" &&
      data.hasOwnProperty(todoElementKey)
    ) {
      todo[todoElementKey] = data[todoElementKey];
    }
  }
  await todo.save();
  return await findOne(id);
}

async function deleteOne(id) {
  const todo = await findOne(id);
  return todo.remove();
}

module.exports = { createOne, findAll, findOne, updateOne, deleteOne };
