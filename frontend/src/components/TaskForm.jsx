import { useState, useEffect } from 'react';

const initialState = {
  title: '',
  description: '',
  category: 'Other',
  priority: 'Medium',
  status: 'Pending',
  dueDate: '',
};

export default function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || '',
        description: editingTask.description || '',
        category: editingTask.category || 'Other',
        priority: editingTask.priority || 'Medium',
        status: editingTask.status || 'Pending',
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : '',
      });
    } else {
      setForm(initialState);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
    setForm(initialState);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
      />
      <div className="form-row">
        <select name="category" value={form.category} onChange={handleChange}>
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
          <option>Health</option>
          <option>Other</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
