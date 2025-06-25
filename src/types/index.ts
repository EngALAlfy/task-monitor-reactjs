
export interface Task {
  id: number;
  title: string;
  type: string;
  price: string;
}

export interface TaskStatus {
  [taskId: number]: boolean;
}

export type UserRole = 'admin' | 'user';

export interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
}
