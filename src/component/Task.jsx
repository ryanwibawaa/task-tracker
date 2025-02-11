import { useContext } from "react";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { GlobalContext } from "../context";

export default function Task({ details }) {
  const {
    task,
    setTask,
    taskData,
    setTaskData,
    onClose,
    setIsEdit,
    setShowModal,
  } = useContext(GlobalContext);

  // Function handling for edit task
  function handleEdit(event) {
    try {
      setTaskData(details);
      setIsEdit(true);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  }

  // Function handling for delete task
  function handleDelete(deletedId) {
    const filteredTask = task.filter((each) => each.taskId != deletedId);
    try {
      localStorage.setItem("task", JSON.stringify(filteredTask));
    } catch (error) {
      console.error("Can't delete the task", error);
    }
    setTask(filteredTask);
  }
  return (
    <div
      key={details.taskId}
      id={details.taskId}
      className=" flex flex-col justify-center items-center outline-2 outline-blue-300 rounded-sm font-semibold py-3 gap-3"
    >
      <p className="text-center">{details.taskName}</p>
      <div className="flex gap-3">
        <FaPenToSquare onClick={handleEdit} />
        <FaRegTrashCan onClick={() => handleDelete(details.taskId)} />
      </div>
    </div>
  );
}
