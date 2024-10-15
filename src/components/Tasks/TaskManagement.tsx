import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setTasks, addTask, updateTask, deleteTask } from '../../slices/taskSlice';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string;
}

const TaskManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    assignedTo: '',
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    // TODO: Fetch tasks from API
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Implement login functionality',
        description: 'Create login form and integrate with backend API',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-03-15',
        assignedTo: 'John Doe',
      },
      {
        id: '2',
        title: 'Design dashboard layout',
        description: 'Create wireframes and mockups for the main dashboard',
        status: 'todo',
        priority: 'medium',
        dueDate: '2024-03-20',
        assignedTo: 'Jane Smith',
      },
    ];
    dispatch(setTasks(mockTasks));
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingTask) {
      setEditingTask({ ...editingTask, [name]: value });
    } else {
      setNewTask({ ...newTask, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      dispatch(updateTask(editingTask));
      setEditingTask(null);
    } else {
      dispatch(addTask({ ...newTask, id: Date.now().toString() } as Task));
      setNewTask({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: '',
        assignedTo: '',
      });
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Task Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-10 bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="title"
            value={editingTask?.title || newTask.title}
            onChange={handleInputChange}
            placeholder="Task Title"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:border-blue-300"
            required
          />
          <select
            name="status"
            value={editingTask?.status || newTask.status}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:border-blue-300"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <textarea
            name="description"
            value={editingTask?.description || newTask.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:border-blue-300"
            rows={3}
          ></textarea>
          <select
            name="priority"
            value={editingTask?.priority || newTask.priority}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:border-blue-300"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={editingTask?.dueDate || newTask.dueDate}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:border-blue-300"
          />
          <input
            type="text"
            name="assignedTo"
            value={editingTask?.assignedTo || newTask.assignedTo}
            onChange={handleInputChange}
            placeholder="Assigned To"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all"
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-xl">
            <h3 className="font-bold text-xl text-gray-800">{task.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{task.description}</p>
            <div className="mt-4">
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                task.priority === 'high' ? 'bg-red-100 text-red-700' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {task.priority}
              </span>
              <span className={`ml-3 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                task.status === 'todo' ? 'bg-gray-100 text-gray-700' :
                task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>
                {task.status}
              </span>
            </div>
            <p className="text-sm mt-4 text-gray-500">Due: {task.dueDate}</p>
            <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={() => handleEdit(task)} className="text-blue-600 hover:text-blue-800">
                <Edit size={20} />
              </button>
              <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:text-red-800">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
