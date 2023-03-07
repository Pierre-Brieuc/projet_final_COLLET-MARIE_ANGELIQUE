// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require("express").Router();
const todosService = require("./todos.service");
const authorizationMiddleware = require("../authorization/authorization.middleware");
const httpErrorHelper = require("../custom-errors/http-error.helper");

async function controllerCreateOneTodo(req, res) {
  const newTodo = await todosService.createOne(req.body);
  return res.status(201).send(newTodo);
}

router.post(
  "/",
  authorizationMiddleware.canAccess(["admin"]),
  controllerCreateOneTodo
);

async function controllerGetAllTodo(req, res) {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;
  const todos = await todosService.findAll(limit, offset);
  return res.status(200).send(todos);
}

router.get("/", controllerGetAllTodo);

async function controllerGetOneTodo(req, res, next) {
  try {
    const todo = await todosService.findOne(req.params.id);
    return res.status(200).send(todo);
  } catch (err) {
    return httpErrorHelper(err, req, res, next);
  }
}

router.get("/:id", controllerGetOneTodo);

async function controllerUpdateOneTodo(req, res, next) {
  try {
    const todo = await todosService.updateOne(req.params.id, req.body);
    return res.status(200).send(todo);
  } catch (err) {
    return httpErrorHelper(err, req, res, next);
  }
}

router.patch(
  "/:id",
  authorizationMiddleware.canAccess(["admin"]),
  controllerUpdateOneTodo
);

async function controllerDeleteOneTodo(req, res, next) {
  try {
    const todo = await todosService.deleteOne(req.params.id);
    return res.status(200).send(todo);
  } catch (err) {
    return httpErrorHelper(err, req, res, next);
  }
}

router.delete(
  "/:id",
  authorizationMiddleware.canAccess(["admin"]),
  controllerDeleteOneTodo
);

module.exports = router;
