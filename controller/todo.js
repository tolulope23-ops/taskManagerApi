const Todo = require('../model/today');
const {StatusCodes} = require('http-status-codes');


const addTodo = async (req, res) => {
    const {title, content, todoType, dueDate} = req.body;
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(StatusCodes.CREATED).json({
            success: true,
            StatusCode:StatusCodes.CREATED,
            message:"Note(s) sent successfully",
            data:todo
        });
    } catch (error) {
        console.log(error.message);
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            StatusCode:StatusCodes.BAD_REQUEST,
            message:`${error.message}: Note not sent`,
            data:{}
        });
    }
}

const displayTodo = async(req, res) => {
    const {title, content, todoType, dueDate} = req.body;
    try {
        const todos = await Todo.find();
        if (todos.length == 0){
            res.status(StatusCodes.NO_CONTENT).json({
                success: false,
                StatusCode:StatusCodes.NO_CONTENT,
                message:`${error.message}: No Todo Found!`,
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            success: true,
            StatusCode:StatusCodes.OK,
            message:"Note(s) displayed successfully",
            data:todos
        });
    } catch (error) {
        
    }
}

module.exports = {addTodo, displayTodo};