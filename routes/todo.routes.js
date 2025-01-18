// routes/todo.routes.js

const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { getAllTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller');
const router = express.Router();

// Routes
router.get('/', authMiddleware, getAllTodos);
router.post('/', authMiddleware, createTodo);
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);

module.exports = router;
