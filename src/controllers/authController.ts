import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error: unknown) {
    if(error instanceof Error){
        res.status(400).json({ message: error.message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error: unknown) {
    if(error instanceof Error){
        res.status(500).json({ message: error.message });
    }
  }
};
