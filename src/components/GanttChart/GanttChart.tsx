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
        const initialTasks:any = filteredTasks.map((phase) => ({
            id: phase.id,
            name: phase.title,
            start: new Date(),
            end: new Date(phase.dueDate),
            isCompleted: phase.isCompleted,
            status: phase.status,
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
        <div className="overflow-x-auto mt-20 bg-white p-4 rounded-md">
            <div className="relative">
                <div className="flex flex-col md:flex-row justify-between font-bold border-gray-300 pb-4">
                    <div className="w-full text-2xl text-left">Gantt Chart</div>
                </div>

                <div className="mt-2">
                    {tasks.map((task:any) => (
                        <div key={task.id} className="flex items-center mb-4">
                            <div className="w-full md:w-1/4 text-left">{task.name}</div>
                            <div className="w-full md:w-1/4 text-left">
                                <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value as 'To Do' | 'In Progress' | 'Done')}
                                    className="border border-gray-300 rounded-md p-1"
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                            <div className="relative w-full md:w-1/2 h-6 bg-gray-200">
                                <div
                                    className={`absolute h-full ${getColorByStatus(task.status)} transition-all duration-300`}
                                    style={{
                                        width: `${calculateTaskWidth(task.start, task.end, totalDays)}%`,
                                        left: `${((task.start.getTime() - today.getTime()) / (1000 * 3600 * 24) / totalDays) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GanttChart;
