import React, { useState, useEffect } from 'react';

interface Task {
    id: number;
    title: string;
    dueDate: string;
    isCompleted: boolean;
    status: 'To Do' | 'In Progress' | 'Done';
}

interface GanttChartProps {
    filteredTasks: Task[];
}

const GanttChart: React.FC<GanttChartProps> = ({ filteredTasks }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const initialTasks:any = filteredTasks.map((task) => ({
            id: task.id,
            name: task.title,
            start: new Date(),
            end: new Date(task.dueDate),
            isCompleted: task.isCompleted,
            status: task.status,
        }));
        setTasks(initialTasks);
    }, [filteredTasks]);

    const calculateTaskWidth = (start: Date, end: Date, totalDays: number): number => {
        const duration = Math.abs(end.getTime() - start.getTime()) / (1000 * 3600 * 24);
        return (duration / totalDays) * 100;
    };

    const today = new Date();
    const totalDays = Math.max(...tasks.map((task:any) => (task.end.getTime() - task.start.getTime()) / (1000 * 3600 * 24)), 1);

    const getColorByStatus = (status: string): string => {
        switch (status) {
            case 'Done':
                return 'bg-green-500';
            case 'In Progress':
                return 'bg-blue-500';
            case 'To Do':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-300';
        }
    };

    const handleStatusChange = (taskId: number, newStatus: 'To Do' | 'In Progress' | 'Done') => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    return (
        <div className="overflow-x-auto my-20 bg-white p-6 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Gantt Chart</h2>
            </div>

            <div className="space-y-4">
                {tasks.map((task:any) => (
                    <div key={task.id} className="flex items-center space-x-4">
                     
                        <div className="w-1/4 text-left font-medium text-gray-700">{task.name}</div>
                      
                        <div className="w-1/4">
                            <select
                                value={task.status}
                                onChange={(e) => handleStatusChange(task.id, e.target.value as 'To Do' | 'In Progress' | 'Done')}
                                className="w-full border border-gray-300 rounded-md p-1 text-gray-700"
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        
                        <div className="relative w-1/2 h-6 bg-gray-200 rounded-md overflow-hidden">
    <div
        className={`absolute h-full ${getColorByStatus(task.status)} rounded-md transition-all duration-300`}
        style={{
            width: `${calculateTaskWidth(task.start, task.end, totalDays) - 2}%`, // Slightly reduce width for better fit
            left: `${((task.start.getTime() - today.getTime()) / (1000 * 3600 * 24) / totalDays) * 100}%`,
            marginRight: '4px', 
        }}
    />
</div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default GanttChart;
