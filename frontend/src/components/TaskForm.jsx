export default function TaskForm({ form, setForm, createTask }) {
  return (
    <form onSubmit={createTask} className="card">
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />

      <select
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button className="btn-blue">Add Task</button>
    </form>
  );
}