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
            message:"Todo(s) sent successfully",
            data:todo
        });
    } catch (error) {
        console.log(error.message);
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            StatusCode:StatusCodes.BAD_REQUEST,
            message:`${error.message}: Todo not sent`,
            data:{}
        });
    }
}

const displayTodos = async(req, res) => {
    const {title, content, todoType, dueDate} = req.body;
    try {
        const todos = await Todo.find();
        if (todos.length == 0){
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                StatusCode:StatusCodes.NOT_FOUND,
                message:"No Todo(s) Found!",
                data:{}
            });
        }
        res.status(StatusCodes.OK).json({
            success: true,
            StatusCode:StatusCodes.OK,
            message:"Todo(s) displayed successfully",
            data:todos
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            StatusCode:StatusCodes.BAD_REQUEST,
            message:"Todo(s) not Found",
            data:{}
        });
    }
}

const displayTodo = async(req, res) =>{
    const {id} = req.params;
    try {
        const todo = await Todo.findById({_id:id});
        if(!todo){
            return res.status(StatusCodes.NOT_FOUND).json({
                success:false,
                StatusCode:StatusCodes.NOT_FOUND,
                message:"No Todo found",
                data:{}
            })
        }
        res.status(StatusCodes.OK).json({
            success: true,
            StatusCode:StatusCodes.OK,
            message:"Todo displayed successfully",
            data:todo
        });

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            StatusCode:StatusCodes.BAD_REQUEST,
            message:"Todo not Found",
            data:{}
        });
    }
}

const updateTodo = async(req, res) => {
    const {id} = req.params;
    const {title, content, todoType, dueDate} = req.body;
    try {
        const todo = await Todo.findByIdAndUpdate({_id:id}, {title, content, todoType, dueDate}, {new:true});
        if(!todo){
            return res.status(StatusCodes.NOT_FOUND).json({
                success:false,
                StatusCode:StatusCodes.NOT_FOUND,
                message:`Todo not Found with the Id ${id}`,
                data:{}
            })
        }
        res.status(StatusCodes.OK).json({
            success:true,
            StatusCode:StatusCodes.OK,
            message:"Todo Updated Successfully",
            data:todo
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message:"Todo not Updated",
            data:{}
        });
    }
}

const deleteTodo = async(req, res) => {
    const {id} = req.params;
    try {
        const todo = await Todo.findByIdAndDelete({_id:id});
        if(!todo){
            return res.status(StatusCodes.NOT_FOUND).json({
                success:false,
                StatusCode:StatusCodes.NOT_FOUND,
                message:`Todo not Found with the Id ${id}`,
                data:{}
            })
        }
        res.status(StatusCodes.OK).json({
            success:true,
            StatusCode:StatusCodes.OK,
            message:"Todo Deleted Successfully",
            data:todo
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message:"Todo not Deleted",
            data:{}
        });
    }
}

module.exports = {addTodo, displayTodos, displayTodo, updateTodo, deleteTodo};