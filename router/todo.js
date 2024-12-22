const express = require("express");
const router =  express.Router();
const {addTodo, displayTodos, updateTodo, displayTodo, deleteTodo} = require('../controller/today');

//Router for today Controller
router.post("/addTodo", addTodo);
router.get("/todos", displayTodos);
router.get("/:id", displayTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);







module.exports = router;