import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  // Initial state
  const [id, setId] = useState(0);
  const [taskData, setTaskData] = useState({
    taskId: id,
    taskName: "",
    progress: "",
  });
  const [task, setTask] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Initial retrieval
  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem("task")) || [];
    setTask(storedTask);
    const storedId = JSON.parse(localStorage.getItem("id")) + 1 || 0;
    setId(storedId);
  }, []);

  // Close modal
  function onClose() {
    setShowModal(false);
    setTaskData({ taskId: id, taskName: "", progress: "" });
  }

  // Main handling of add task or edit task
  function mainHandleAddTask(currentTaskData) {
    try {
      if (!currentTaskData.taskName || !currentTaskData.progress) return;
      if (!isEdit) {
        const updatedTask = [...task, { ...currentTaskData, taskId: id }];
        setTask(updatedTask);
        console.log("updatedTask");
        localStorage.setItem("task", JSON.stringify(updatedTask));
        setId((prev) => prev + 1);
        localStorage.setItem("id", JSON.stringify(id));
      } else {
        const updatedTask = task.map((eachTask) => {
          if (eachTask.taskId === currentTaskData.taskId) {
            eachTask.taskName = currentTaskData.taskName;
            eachTask.progress = currentTaskData.progress;
            setTask(updatedTask);
            localStorage.setItem("task", JSON.stringify(updatedTask));
          }
        });
      }
      setTaskData({
        taskId: id,
        taskName: "",
        progress: "",
      });
      setIsEdit(false);
    } catch (error) {
      console.error("Error in adding task!", error);
    }
    setIsEdit(false);
  }

  return (
    <GlobalContext.Provider
      value={{
        id,
        setId,
        taskData,
        setTaskData,
        task,
        setTask,
        mainHandleAddTask,
        onClose,
        showModal,
        setShowModal,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
