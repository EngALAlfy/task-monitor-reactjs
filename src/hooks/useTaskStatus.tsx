
import { useState, useEffect } from 'react';
import { TaskStatus } from '../types';

export const useTaskStatus = () => {
  const [taskStatus, setTaskStatus] = useState<TaskStatus>({});

  useEffect(() => {
    const savedStatus = localStorage.getItem('taskMonitorStatus');
    if (savedStatus) {
      setTaskStatus(JSON.parse(savedStatus));
    }
  }, []);

  const toggleTaskStatus = (taskId: number) => {
    const newStatus = {
      ...taskStatus,
      [taskId]: !taskStatus[taskId]
    };
    setTaskStatus(newStatus);
    localStorage.setItem('taskMonitorStatus', JSON.stringify(newStatus));
  };

  const getProgress = () => {
    const completedTasks = Object.values(taskStatus).filter(Boolean).length;
    const totalTasks = 55; // Total number of tasks
    return Math.round((completedTasks / totalTasks) * 100);
  };

  const getCompletedCount = () => {
    return Object.values(taskStatus).filter(Boolean).length;
  };

  return {
    taskStatus,
    toggleTaskStatus,
    getProgress,
    getCompletedCount
  };
};
