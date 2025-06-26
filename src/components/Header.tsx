
import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { role, logout } = useAuth();

  const getRoleDisplay = () => {
    return role === 'admin' ? 'مسؤول' : 'مستخدم';
  };

  const getRoleBadgeColor = () => {
    return role === 'admin' 
      ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
      : 'bg-gradient-to-r from-blue-500 to-indigo-600';
  };

  const handleLogout = () => {
    console.log('Header: Logout button clicked');
    logout();
    // Force page reload after logout
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-lg text-white font-bold">TM</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">مراقب المهام</h1>
              <p className="text-sm text-gray-600">نظام إدارة المهام</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getRoleBadgeColor()}`}>
              {getRoleDisplay()}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">خروج</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
