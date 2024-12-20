const express = require("express");
const router =  express.Router();
const {addTodo, displayTodo} = require('../controller/todo')


router.post("/addTodo", addTodo);
router.get("/todos", displayTodo);
module.exports = router;