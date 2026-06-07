import { Request } from 'express';

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface AuthRequest extends Request {
  user?: UserResponse;
}
