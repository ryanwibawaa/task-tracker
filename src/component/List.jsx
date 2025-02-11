import { useContext } from "react";
import Task from "./Task";
import { GlobalContext } from "../context";

export default function List({ statusProgress }) {
  const { task } = useContext(GlobalContext);

  const filteredTask = task.filter(
    (eachTask) => eachTask.progress === statusProgress
  );

  return (
    <div
      key={statusProgress}
      id={statusProgress}
      className="flex flex-col w-full"
    >
      <div className="border-4 border-blue-300 py-3 rounded-lg mb-4">
        <h2 className="text-center font-bold">{statusProgress}</h2>
      </div>

      <div className="flex flex-col gap-3">
        {filteredTask.map((each) => (
          <Task key={each.taskId} details={each} />
        ))}
      </div>
    </div>
  );
}
