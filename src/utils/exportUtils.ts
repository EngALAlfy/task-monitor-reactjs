
import { Task } from '../types';
import { TaskStatus } from '../types';

export const exportToHTML = (tasks: Task[], taskStatus: TaskStatus, projectName: string) => {
  const completedTasks = Object.values(taskStatus).filter(Boolean).length;
  const totalTasks = tasks.length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تقرير المهام - ${projectName}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            direction: rtl;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 1.2em;
            opacity: 0.9;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 40px;
            background: #f8fafc;
        }
        .stat-card {
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
        }
        .stat-number {
            font-size: 3em;
            font-weight: bold;
            margin: 0;
        }
        .stat-label {
            color: #64748b;
            font-size: 1.1em;
            margin: 10px 0 0 0;
        }
        .completed { color: #10b981; }
        .remaining { color: #f59e0b; }
        .total { color: #3b82f6; }
        .progress { color: #8b5cf6; }
        .progress-bar {
            width: 100%;
            height: 20px;
            background: #e2e8f0;
            border-radius: 10px;
            overflow: hidden;
            margin: 20px 0;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #059669);
            width: ${progress}%;
            transition: width 0.3s ease;
        }
        .tasks-section {
            padding: 40px;
        }
        .section-title {
            font-size: 2em;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 30px;
            text-align: center;
        }
        .tasks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
        }
        .task-card {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 15px;
            padding: 25px;
            transition: all 0.3s ease;
        }
        .task-card.completed {
            border-color: #10b981;
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
        }
        .task-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 15px;
        }
        .task-id {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }
        .task-title {
            flex: 1;
            margin: 0 15px;
            font-weight: 600;
            color: #1e293b;
            line-height: 1.5;
        }
        .task-status {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
        }
        .task-status.completed {
            background: #10b981;
        }
        .task-status.pending {
            background: #64748b;
            border: 2px solid #94a3b8;
        }
        .task-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
        }
        .task-type {
            background: #3b82f6;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: 500;
        }
        .task-price {
            font-weight: bold;
            color: #f59e0b;
        }
        .task-price.free {
            color: #10b981;
        }
        .footer {
            background: #1e293b;
            color: white;
            text-align: center;
            padding: 30px;
        }
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${projectName}</h1>
            <p>تقرير حالة المهام</p>
            <p>تاريخ التقرير: ${new Date().toLocaleDateString('ar-SA')}</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <p class="stat-number completed">${completedTasks}</p>
                <p class="stat-label">مهام مكتملة</p>
            </div>
            <div class="stat-card">
                <p class="stat-number remaining">${totalTasks - completedTasks}</p>
                <p class="stat-label">مهام متبقية</p>
            </div>
            <div class="stat-card">
                <p class="stat-number total">${totalTasks}</p>
                <p class="stat-label">إجمالي المهام</p>
            </div>
            <div class="stat-card">
                <p class="stat-number progress">${progress}%</p>
                <p class="stat-label">نسبة الإنجاز</p>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>
        </div>

        <div class="tasks-section">
            <h2 class="section-title">تفاصيل المهام</h2>
            <div class="tasks-grid">
                ${tasks.map(task => {
                  const isCompleted = taskStatus[task.id] || false;
                  const isFree = task.price === '0 ج' || task.price === '-';
                  return `
                    <div class="task-card ${isCompleted ? 'completed' : ''}">
                        <div class="task-header">
                            <div class="task-id">${task.id}</div>
                            <h3 class="task-title">${task.title}</h3>
                            <div class="task-status ${isCompleted ? 'completed' : 'pending'}">
                                ${isCompleted ? '✓' : '○'}
                            </div>
                        </div>
                        <div class="task-meta">
                            <span class="task-type">${task.type}</span>
                            <span class="task-price ${isFree ? 'free' : ''}">${task.price}</span>
                        </div>
                    </div>
                  `;
                }).join('')}
            </div>
        </div>

        <div class="footer">
            <p>تم إنشاء هذا التقرير بواسطة نظام مراقب المهام</p>
        </div>
    </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName}-tasks-report.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToExcel = (tasks: Task[], taskStatus: TaskStatus, projectName: string) => {
  const completedTasks = Object.values(taskStatus).filter(Boolean).length;
  const totalTasks = tasks.length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  let csvContent = '\uFEFF'; // UTF-8 BOM for Excel Arabic support
  
  // Header information
  csvContent += `تقرير المهام - ${projectName}\n`;
  csvContent += `تاريخ التقرير: ${new Date().toLocaleDateString('ar-SA')}\n`;
  csvContent += `\n`;
  
  // Statistics
  csvContent += `الإحصائيات:\n`;
  csvContent += `المهام المكتملة,${completedTasks}\n`;
  csvContent += `المهام المتبقية,${totalTasks - completedTasks}\n`;
  csvContent += `إجمالي المهام,${totalTasks}\n`;
  csvContent += `نسبة الإنجاز,${progress}%\n`;
  csvContent += `\n`;
  
  // Tasks header
  csvContent += `رقم المهمة,اسم المهمة,النوع,السعر,الحالة\n`;
  
  // Tasks data
  tasks.forEach(task => {
    const isCompleted = taskStatus[task.id] || false;
    const status = isCompleted ? 'مكتملة' : 'غير مكتملة';
    csvContent += `${task.id},"${task.title}","${task.type}","${task.price}","${status}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName}-tasks-report.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
