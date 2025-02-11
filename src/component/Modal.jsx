import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../context";

export default function Modal({ currentTaskData }) {
  const { mainHandleAddTask, setTaskData, onClose, isEdit } =
    useContext(GlobalContext);
  const modalRef = useRef();

  // Function handling when change values in the modal
  function handleChange(event) {
    setTaskData({
      ...currentTaskData,
      [event.target.name]: event.target.value,
    });
  }

  // Function handling for add new task
  function handleAddTask(event) {
    event.preventDefault();
    try {
      mainHandleAddTask(currentTaskData);
    } catch (error) {
      console.log(error);
    }
    onClose();
  }

  //
  useEffect(() => {
    const closeModal = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", closeModal);

    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [onClose]);

  return (
    <div className="z-1 bg-gray-700/50 w-full h-full fixed left-0 top-0 flex justify-center">
      {/* Give animation */}
      <div
        ref={modalRef}
        className="relative w-2xl m-auto bg-white p-10 flex flex-col gap-10 rounded-md outline-5 outline-blue-500"
      >
        <div className="flex justify-between">
          <p className="font-bold text-lg">
            {isEdit ? "Edit Current Task" : "Add New Task"}
          </p>
          <p className="cursor-pointer" onClick={onClose}>
            X
          </p>
        </div>
        <input
          type="text"
          name="taskName"
          id="task"
          placeholder="Cooking egg.."
          className="outline-3 outline-blue-500 p-2 rounded-sm hover:outline-blue-300 focus:outline-blue-300"
          value={currentTaskData.taskName}
          onChange={handleChange}
          autoFocus
        />
        <div className="flex gap-4 justify-around">
          <div>
            <label className="has-checked:outline-3 has-checked:outline-blue-500 px-3 py-2 rounded-sm cursor-pointer">
              <input
                type="radio"
                name="progress"
                value="to-do"
                id="to-do"
                className="hidden"
                onChange={handleChange}
                checked={currentTaskData.progress === "to-do"}
              />
              To do
            </label>
          </div>

          <div>
            <label className="has-checked:outline-3 has-checked:outline-blue-500 px-3 py-2 rounded-sm cursor-pointer">
              <input
                type="radio"
                name="progress"
                value="in-progress"
                id="in-progress"
                className="hidden"
                onChange={handleChange}
                checked={currentTaskData.progress === "in-progress"}
              />
              In progress
            </label>
          </div>

          <div>
            <label className="has-checked:outline-3 has-checked:outline-blue-500 px-3 py-2 rounded-sm cursor-pointer">
              <input
                type="radio"
                name="progress"
                value="completed"
                id="completed"
                className={"hidden"}
                onChange={handleChange}
                checked={currentTaskData.progress === "completed"}
              />
              Completed
            </label>
          </div>
        </div>

        <button
          className="font-semibold text-blue-500 cursor-pointer outline-3 outline-blue-500 bg-white w-max px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white"
          onClick={handleAddTask}
        >
          {isEdit ? "Edit Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
}
