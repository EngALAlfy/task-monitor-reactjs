
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const { isAuthenticated } = useAuth();

  console.log('Index: Rendering with isAuthenticated:', isAuthenticated);

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <LoginForm />}
    </>
  );
};

export default Index;
