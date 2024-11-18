import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';

interface AuthRequest extends Request {
  user?: any;
}

export const createTodo = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  try {
    const newTodo = new Todo({
      userId: req?.user?.id,
      title,
      description,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error: unknown) {
    if(error instanceof Error){
        res.status(400).json({ message: error.message });
    }
  }
};

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const todos = await Todo.find({ userId: req?.user?.id });
    res.status(200).json(todos);
  } catch (error: unknown) {
    if(error instanceof Error){
        res.status(500).json({ message: error.message });
    }
  }
};

export const getTodoById = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req?.user?.id });
    if (todo) res.status(200).json(todo);
    else res.status(404).json({ message: 'Todo not found' });
  } catch (error: unknown) {
    if(error instanceof Error){
        res.status(500).json({ message: error.message });
    }
  }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req?.user?.id },
      req.body,
      { new: true }
    );
    if (updatedTodo) res.status(200).json(updatedTodo);
    else res.status(404).json({ message: 'Todo not found' });
  } catch (error: unknown) {
    if(error instanceof Error){
        res.status(400).json({ message: error.message });
    }
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req?.user?.id });
    if (deletedTodo) res.status(200).json({ message: 'Todo deleted' });
    else res.status(404).json({ message: 'Todo not found' });
  } catch (error: unknown) {
    if(error instanceof Error){
        res.status(500).json({ message: error.message });
    }
  }
};
