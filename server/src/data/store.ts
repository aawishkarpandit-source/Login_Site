import { User } from '../types';
import { v4 as uuidv4 } from 'uuid';

const users: Map<string, User> = new Map();

export const findUserByEmail = (email: string): User | undefined => {
  for (const user of users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return undefined;
};

export const findUserByUsername = (username: string): User | undefined => {
  for (const user of users.values()) {
    if (user.username === username) {
      return user;
    }
  }
  return undefined;
};

export const findUserById = (id: string): User | undefined => {
  return users.get(id);
};

export const createUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  const user: User = {
    id: uuidv4(),
    ...userData,
    createdAt: new Date(),
  };
  users.set(user.id, user);
  return user;
};

export const getAllUsers = (): User[] => {
  return Array.from(users.values());
};
