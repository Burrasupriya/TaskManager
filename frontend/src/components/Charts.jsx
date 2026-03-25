import { Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function Charts({ stats }) {
  const data = {
    labels: ["Done", "Pending"],
    datasets: [
      {
        data: [stats.completed, stats.pending],
        backgroundColor: ["#16a34a", "#f59e0b"],
      },
    ],
  };

  return (
    <div className="card" style={{ maxWidth: "300px", margin: "auto" }}>
      <Pie data={data} />
    </div>
  );
}