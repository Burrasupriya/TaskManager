export default function StatsCard({ stats }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
      <div className="card" style={{ flex: 1, background: "#3b82f6", color: "white" }}>
        <h3>Total</h3>
        <h2>{stats.total}</h2>
      </div>

      <div className="card" style={{ flex: 1, background: "#16a34a", color: "white" }}>
        <h3>Completed</h3>
        <h2>{stats.completed}</h2>
      </div>

      <div className="card" style={{ flex: 1, background: "#f59e0b", color: "white" }}>
        <h3>Pending</h3>
        <h2>{stats.pending}</h2>
      </div>

      <div className="card" style={{ flex: 1, background: "#9333ea", color: "white" }}>
        <h3>% Done</h3>
        <h2>{stats.percentage}%</h2>
      </div>
    </div>
  );
}