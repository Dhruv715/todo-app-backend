const Todo = require('../models/todo.model');

// Get all todos
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            success: true,
            code: 200,
            data: todos,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            message: 'Failed to retrieve todos',
            error: error.message,
        });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json({
            success: true,
            code: 201,
            data: todo,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            code: 400,
            message: 'Failed to create todo',
            error: error.message,
        });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        if (!todo) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'Todo not found',
            });
        }
        res.status(200).json({
            success: true,
            code: 200,
            data: todo,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            code: 400,
            message: 'Failed to update todo',
            error: error.message,
        });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: 'Todo not found',
            });
        }
        res.status(200).json({
            success: true,
            code: 200,
            message: 'Todo deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
            message: 'Failed to delete todo',
            error: error.message,
        });
    }
};
