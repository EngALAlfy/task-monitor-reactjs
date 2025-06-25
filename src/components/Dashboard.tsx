
import React from 'react';
import Header from './Header';
import ProgressStats from './ProgressStats';
import TaskList from './TaskList';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          <ProgressStats />
          <TaskList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
