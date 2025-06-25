
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Task } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useTaskStatus } from '../hooks/useTaskStatus';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { role } = useAuth();
  const { taskStatus, toggleTaskStatus } = useTaskStatus();
  const isCompleted = taskStatus[task.id] || false;
  const isAdmin = role === 'admin';

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'المتجر':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'اللانديج':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'المتجر+ اللانديج':
      case 'اللانديج + المتجر':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriceColor = (price: string) => {
    if (price === '0 ج' || price === '-') {
      return 'text-green-600';
    }
    return 'text-orange-600';
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
        isCompleted 
          ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' 
          : 'border-gray-200 hover:border-blue-200'
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">{task.id}</span>
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold text-right leading-relaxed transition-colors duration-200 ${
                isCompleted ? 'text-green-800' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
            </div>
          </div>
          
          {isAdmin ? (
            <button
              onClick={() => toggleTaskStatus(task.id)}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isCompleted 
                  ? 'text-green-500 hover:bg-green-50' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-green-500'
              }`}
              title={isCompleted ? 'تم الإنجاز - اضغط للإلغاء' : 'غير مكتمل - اضغط للإنجاز'}
            >
              {isCompleted ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
          ) : (
            <div className={`p-2 transition-colors duration-200 ${
              isCompleted ? 'text-green-500' : 'text-gray-400'
            }`}>
              {isCompleted ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className={`px-3 py-1 rounded-full border font-medium ${getTypeColor(task.type)}`}>
            {task.type}
          </span>
          <span className={`font-bold ${getPriceColor(task.price)}`}>
            {task.price}
          </span>
        </div>

        {isCompleted && (
          <div className="mt-3 pt-3 border-t border-green-200">
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="w-4 h-4 ml-1" />
              <span className="font-medium">تم الإنجاز</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
