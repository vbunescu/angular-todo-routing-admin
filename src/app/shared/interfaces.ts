export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface CreateUserDto {
  email: string;
  // firstName: string;
  // lastName: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Todo {
  id?: string;
  title: string;
  description: string;
  author: string;
  priority: string;
  date: Date;
}

export interface FbCreateResponse {
  name: string;
}
