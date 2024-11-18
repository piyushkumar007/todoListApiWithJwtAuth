import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log("Middleware runninggggg .................")
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user: any) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = { id: user.id };
  });
  
  console.log("Middleware runninggggg .................")
  next();
};
