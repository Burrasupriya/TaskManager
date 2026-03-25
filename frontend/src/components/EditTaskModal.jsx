import { useState, useEffect } from "react";
import API from "../services/api";

export default function EditTaskModal({ task, close, refresh }) {
  const [form, setForm] = useState(task);

  useEffect(() => {
    
    setForm({
      ...task,
      dueDate: task.dueDate
        ? task.dueDate.substring(0, 10)
        : "",
    });
  }, [task]);

  const updateTask = async () => {
    try {
      await API.put(`/tasks/${task._id}`, form);
      refresh();
      close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000aa" }}>
      <div className="card" style={{ width: "300px", margin: "100px auto" }}>
        <h3>Edit Task</h3>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        
        <input
          type="date"
          value={form.dueDate || ""}
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
        />

        <select
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
  value={form.status}
  onChange={(e) =>
    setForm({ ...form, status: e.target.value })
  }
>
  <option>Todo</option>
  <option>In Progress</option>
  <option>Done</option>
</select>

        <button className="btn-blue" onClick={updateTask}>
          Update
        </button>

        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}