import React from "react";
import { useState } from "react";
import Button from "../common/Button";
import IconClose from "../common/IconClose";

type AddTaskModelProps = {
  onClose: () => void;
  addTask: (title: string, status: "incomplete" | "complete") => void;
  onEditSuccess: () => void;
};

const AddTaskModel: React.FC<AddTaskModelProps> = ({ onClose, addTask }) => {
  const [status, setStatus] = useState<"incomplete" | "complete">("incomplete");
  const [title, setTitle] = useState("");

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title, status);
    }
  };
  return (
    <div className="bg-[#00000080] h-full w-full fixed top-0 left-0 z-[1000]">
      <div className="bg-[#ecedf6] rounded-[8px] mx-auto max-w-[500px] p-[2rem] relative w-[90%] flex top-[25%] ">
        <IconClose onClick={onClose} />
        <form className="w-full flex flex-col gap-[20px]" action="">
          <h1 className="text-[20px] text-[#646681] font-semibold">ADD TODO</h1>
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
            <label className="flex flex-col gap-[10px]" htmlFor="">
              <span className="text-[20px] text-[#646681]">Status</span>
              <select
                className="bg-white w-full p-[10px] "
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "incomplete" | "complete")
                }
              >
                <option value="Incomplete">Incomplete</option>
                <option value="completed">Completed</option>
              </select>
            </label>
          </div>
          <div className="flex  gap-[10px]">
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

export default AddTaskModel;
