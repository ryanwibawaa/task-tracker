import { useContext } from "react";
import { GlobalContext } from "../context";
import PieChart from "./PieChart";

export default function Summary() {
  const { task } = useContext(GlobalContext);
  const totalTask = task.length;

  function countTask(progress) {
    const filteredTask = task.filter((each) => each.progress === progress);

    return filteredTask.length;
  }

  return (
    <div className="flex items-center flex-col gap-5 sm:flex-row sm:justify-around m-7 bg-blue-300 shadow-lg shadow-blue-300/50 p-5 rounded-lg">
      <div className="font-semibold">
        <h2 className="font-bold">
          {totalTask} {totalTask > 1 ? "TICKETS" : "TICKET"}
        </h2>
        <p>To do: {countTask("to-do")}</p>
        <p>In progress: {countTask("in-progress")}</p>
        <p>Completed: {countTask("completed")}</p>
      </div>
      <div>
        <PieChart />
      </div>
    </div>
  );
}
