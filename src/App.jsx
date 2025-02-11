import { useContext, useState } from "react";
import List from "./component/List";
import Summary from "./component/Summary";
import Navbar from "./component/Navbar";
import { GlobalContext } from "./context";
import Modal from "./component/Modal";

function App() {
  const { showModal, taskData } = useContext(GlobalContext);

  return (
    <>
      <Navbar />
      <Summary />
      <div className="flex flex-col sm:flex-row justify-evenly m-7 gap-20">
        <List statusProgress="to-do" />
        <List statusProgress="in-progress" />
        <List statusProgress="completed" />
      </div>
      {showModal && <Modal currentTaskData={taskData} />}
    </>
  );
}

export default App;
