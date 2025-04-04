import React from "react";
import Button from "../common/Button";

type TaskControlsProps = {
  onAddTaskClick: () => void;
  onFilterChange: (filter: "all" | "incomplete" | "complete") => void;
  onAddSuccess: () => void;
};

const TaskControls: React.FC<TaskControlsProps> = ({
  onAddTaskClick,
  onFilterChange,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value as "all" | "incomplete" | "complete");
  };
  return (
    <div className="flex justify-between items-center">
      <Button className="bg-[#646ff0]" onClick={onAddTaskClick}>
        Add Task
      </Button>
      <select
        className="bg-[#cccdde] border-0 text-[#585858] cursor-pointer p-2.5 rounded-[6px] text-[16px]"
        name=""
        id=""
        onChange={handleFilterChange}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </select>
    </div>
  );
};

export default TaskControls;
