import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, UserResponse } from '../types';
import { findUserById } from '../data/store';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserResponse;
    const user = findUserById(decoded.id);
    
    if (!user) {
      res.status(401).json({ error: 'Invalid token.' });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    };
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};

export const generateToken = (user: UserResponse): string => {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};
