import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import Button from "../common/Button";
import TimeStamp from "../common/TimeStamp";
import { Task } from "../layouts/Content";

type EditTaskModelProps = {
  task: {
    id: number;
    title: string;
    status: "incomplete" | "complete";
    date: string;
  };
  onClose: () => void;
  onSave: (
    id: number,
    title: string,
    status: "incomplete" | "complete",
    time: string
  ) => void;
  handleNoChange: () => void;
  handleEnterTitle: () => void;
  handleEdit: () => void;
};

const EditTaskModel: React.FC<EditTaskModelProps> = ({
  task,
  onClose,
  onSave,
  handleNoChange,
  handleEnterTitle,
  handleEdit,
}) => {
  const [hover, setHover] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState<"incomplete" | "complete">(task.status);

  useEffect(() => {
    setTitle(task.title.trim());
    setStatus(task.status);
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedTasks = localStorage.getItem("tasks");
    const tasksFromStorage: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

    if (!tasksFromStorage.length || !task) {
      handleEdit();
      onClose();
      return;
    }

    if (!title.trim()) {
      handleEnterTitle();
      return;
    }

    if (task.title === title && task.status === status) {
      handleNoChange();
      return;
    }

    onSave(task.id, title, status, TimeStamp());
  };

  return (
    <div className="bg-[#00000080] h-full w-full fixed top-0 left-0 z-[1000]">
      <div className="bg-[#ecedf6] rounded-[8px] mx-auto max-w-[500px] p-[2rem] relative w-[90%] flex top-[25%] ">
        <div
          className="bg-[#eee] hover:bg-[#e32525] hover:text-white rounded-[4px] cursor-pointer absolute right-[0px] -top-[45px] p-[5px]"
          onClick={onClose}
        >
          <IoMdClose
            size={25}
            color={hover ? "#fff" : "#585858"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form
          className="w-full flex flex-col gap-[20px]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-[20px] text-[#646681] font-semibold">
            Update TODO
          </h1>
          <div className="flex flex-col">
            <label className="flex flex-col gap-[10px]">
              <span className="text-[20px] text-[#646681]">Title</span>
              <input
                className="p-[10px] bg-white w-full"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-[10px]">
              <span className="text-[20px] text-[#646681]">Status</span>
              <select
                className="bg-white w-full p-[10px]"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "incomplete" | "complete")
                }
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
          </div>
          <div className="flex gap-[10px]">
            <Button
              className="hover:bg-[#5059d6] bg-[#646ff0]"
              onClick={(e) => handleSubmit(e)}
            >
              Add Task
            </Button>
            <Button className="bg-[#cccdde] !text-[#646681]" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModel;
