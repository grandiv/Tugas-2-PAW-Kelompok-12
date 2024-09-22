export interface UserSignUp {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface ApiResponse {
  message: string;
  token?: string;
}
