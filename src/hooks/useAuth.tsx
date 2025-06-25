
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
    console.log('useAuth: Loading saved auth from localStorage');
    const savedAuth = localStorage.getItem('taskMonitorAuth');
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        console.log('useAuth: Found saved auth:', parsed);
        setAuthState(parsed);
      } catch (error) {
        console.error('useAuth: Error parsing saved auth:', error);
        localStorage.removeItem('taskMonitorAuth');
      }
    }
  }, []);

  const login = (password: string): boolean => {
    console.log('useAuth: Attempting login with password:', password);
    let role: UserRole | null = null;
    
    if (password === ADMIN_PASSWORD) {
      role = 'admin';
    } else if (password === USER_PASSWORD) {
      role = 'user';
    }

    if (role) {
      const newAuthState = { isAuthenticated: true, role };
      console.log('useAuth: Login successful, new auth state:', newAuthState);
      setAuthState(newAuthState);
      localStorage.setItem('taskMonitorAuth', JSON.stringify(newAuthState));
      return true;
    }
    
    console.log('useAuth: Login failed - invalid password');
    return false;
  };

  const logout = () => {
    console.log('useAuth: Logging out');
    const newAuthState = { isAuthenticated: false, role: null };
    setAuthState(newAuthState);
    localStorage.removeItem('taskMonitorAuth');
  };

  console.log('useAuth: Current auth state:', authState);

  return {
    ...authState,
    login,
    logout
  };
};
