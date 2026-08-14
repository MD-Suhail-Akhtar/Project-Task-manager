import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (categoryFilter) params.category = categoryFilter;
      const { data } = await api.get('/tasks', { params });
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, categoryFilter]);

  useEffect(() => {
    const timeout = setTimeout(fetchTasks, 300);
    return () => clearTimeout(timeout);
  }, [fetchTasks]);

  const handleCreateOrUpdate = async (form) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, form);
        setEditingTask(null);
      } else {
        await api.post('/tasks', form);
      }
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'Pending').length,
    inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
  };

  return (
    <div className="dashboard">
      <h1>My Tasks</h1>

      <div className="stats-row">
        <div className="stat-card"><span>{stats.total}</span>Total</div>
        <div className="stat-card"><span>{stats.pending}</span>Pending</div>
        <div className="stat-card"><span>{stats.inProgress}</span>In Progress</div>
        <div className="stat-card"><span>{stats.completed}</span>Completed</div>
      </div>

      <TaskForm
        onSubmit={handleCreateOrUpdate}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <div className="filters">
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
          <option>Health</option>
          <option>Other</option>
        </select>
      </div>

      {loading ? (
        <p className="center">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="center">No tasks found. Add one above!</p>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={setEditingTask}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
