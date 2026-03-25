export default function FilterBar({
  filters,
  setFilters,
  applyFilters,
  clearFilters,
}) {
  return (
    <div className="card">
      <input
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

      <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
        <option value="">All Status</option>
        <option>Todo</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <select onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
        <option value="">All Priority</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
        <option value="">Sort</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>

      <div style={{ display: "flex", gap: "10px" }}>
        <button className="btn-blue" onClick={applyFilters}>
          Apply
        </button>

        <button className="btn-red" onClick={clearFilters}>
          Clear
        </button>
      </div>
    </div>
  );
}