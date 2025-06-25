
import { useState, useEffect } from 'react';
import { AuthState, UserRole } from '../types';

const ADMIN_PASSWORD = '00114477';
const USER_PASSWORD = '123456789';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    role: null
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem('taskMonitorAuth');
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      setAuthState(parsed);
    }
  }, []);

  const login = (password: string): boolean => {
    let role: UserRole | null = null;
    
    if (password === ADMIN_PASSWORD) {
      role = 'admin';
    } else if (password === USER_PASSWORD) {
      role = 'user';
    }

    if (role) {
      const newAuthState = { isAuthenticated: true, role };
      setAuthState(newAuthState);
      localStorage.setItem('taskMonitorAuth', JSON.stringify(newAuthState));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    const newAuthState = { isAuthenticated: false, role: null };
    setAuthState(newAuthState);
    localStorage.removeItem('taskMonitorAuth');
  };

  return {
    ...authState,
    login,
    logout
  };
};
