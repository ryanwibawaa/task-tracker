import { useContext, useState } from "react";
import Modal from "./Modal";
import { GlobalContext } from "../context";

export default function Navbar() {
  const { setTaskData, setIsEdit, setShowModal, id } =
    useContext(GlobalContext);

  // Function handling for add task
  function toggleAdd() {
    setIsEdit(false);
    setShowModal(true);
    setTaskData({ taskId: id, taskName: "", progress: "" });
  }

  return (
    <nav className="flex justify-between gap-10 p-7 border-b-4  border-blue-400 items-center">
      <h1 className="flex-1 text-center text-2xl sm:ml-44 font-bold">
        Task Tracker App
      </h1>

      <button
        onClick={toggleAdd}
        className="bg-blue-300 hover:bg-blue-400 p-3 rounded-lg cursor-pointer text-center"
      >
        + Add New Task
      </button>
    </nav>
  );
}
