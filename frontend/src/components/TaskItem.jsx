export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const priorityClass = `priority-${task.priority.toLowerCase()}`;

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`badge ${priorityClass}`}>{task.priority}</span>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-meta">
        <span className="badge badge-category">{task.category}</span>
        {task.dueDate && (
          <span className="due-date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
      <div className="task-footer">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className={`status-select status-${task.status.replace(' ', '-').toLowerCase()}`}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <div className="task-actions">
          <button className="btn-link" onClick={() => onEdit(task)}>Edit</button>
          <button className="btn-link btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
