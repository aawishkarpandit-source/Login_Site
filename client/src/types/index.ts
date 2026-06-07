export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}
