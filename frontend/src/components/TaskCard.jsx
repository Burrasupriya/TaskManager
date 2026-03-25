export default function TaskCard({ task, deleteTask, markDone, setEditTask }) {
  return (
    <div className="card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>

      <p>
  {task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No due date"}
</p>

      <button className="btn-green" onClick={() => markDone(task._id)}>
        Done
      </button>

      <button
        className="btn-yellow"
        onClick={() => setEditTask(task)}
      >
        Edit
      </button>

      <button className="btn-red" onClick={() => deleteTask(task._id)}>
        Delete
      </button>
      
    </div>
  );
}