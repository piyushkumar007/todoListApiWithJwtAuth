import express from 'express';
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController';
import {authenticateToken} from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/todos', authenticateToken, createTodo);
router.get('/todos', authenticateToken, getTodos);
router.get('/todos/:id', authenticateToken, getTodoById);
router.put('/todos/:id', authenticateToken, updateTodo);
router.delete('/todos/:id', authenticateToken, deleteTodo);

export default router;
