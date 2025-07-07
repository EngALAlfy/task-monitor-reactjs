
import React from 'react';
import { FileDown, FileSpreadsheet } from 'lucide-react';
import { tasks } from '../data/tasks';
import { useTaskStatus } from '../hooks/useTaskStatus';
import { exportToHTML, exportToExcel } from '../utils/exportUtils';

const ExportButtons = () => {
  const { taskStatus } = useTaskStatus();
  const projectName = 'مراقب المهام';

  const handleHTMLExport = () => {
    exportToHTML(tasks, taskStatus, projectName);
  };

  const handleExcelExport = () => {
    exportToExcel(tasks, taskStatus, projectName);
  };

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={handleHTMLExport}
        className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-sm"
      >
        <FileDown className="w-4 h-4" />
        <span className="font-medium">تصدير HTML</span>
      </button>
      
      <button
        onClick={handleExcelExport}
        className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-sm"
      >
        <FileSpreadsheet className="w-4 h-4" />
        <span className="font-medium">تصدير Excel</span>
      </button>
    </div>
  );
};

export default ExportButtons;
