import { useContext } from "react";
import { GlobalContext } from "../context";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const { task } = useContext(GlobalContext);
  const toDoData = task.filter((each) => each.progress === "to-do");
  const inProgressData = task.filter((each) => each.progress === "in-progress");
  const completedData = task.filter((each) => each.progress === "completed");

  const data = {
    labels: ["To do", "In Progress", "Completed"],
    datasets: [
      {
        data: [toDoData.length, inProgressData.length, completedData.length],
        backgroundColor: ["#f01212", "#fcf81b", "#2196f3"],
        hoverBackgroundColor: ["#d40f0f", "#e7e41c", "#1d83d6"],
      },
    ],
  };

  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right", // Position of the legend
      },
      tooltip: {
        enabled: true, // Show tooltip on hover
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
}
