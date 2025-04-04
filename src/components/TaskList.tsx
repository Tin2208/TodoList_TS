import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import ButtonIcon from "../common/ButtonIcon";

type Task = {
  id: number;
  title: string;
  status: "incomplete" | "complete";
  date: string;
};

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onDeleteSuccess: () => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) => {
  const handleCheckboxChange = (id: number) => {
    onToggleComplete(id);
  };

  const handleDeleteTask = (id: number) => {
    onDeleteTask(id);
  };

  return (
    <div className="bg-[#ecedf6] rounded-[12px] p-[20px]">
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="bg-[#dedfe1] p-1 px-2 text-center text-[16px] text-[#585858] font-medium rounded-lg">
            No todos
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white rounded-[4px] p-[10px] flex justify-between items-center ${
              task.id === tasks[tasks.length - 1].id ? "" : "mb-[15px]"
            }`}
          >
            <div className="flex items-center gap-[1rem]">
              <div
                className={`${
                  task.status.toLowerCase() === "incomplete"
                    ? "bg-[#dedfe1]"
                    : "bg-[#646ff0]"
                } flex items-center rounded-[2px] cursor-pointer h-[25px] w-[25px] justify-center p-[5px] transition-all duration-300 ease-in-out`}
                onClick={() => handleCheckboxChange(task.id)}
              >
                {task.status.toLowerCase() !== "incomplete" && (
                  <FaCheck color="#fff" size={15} />
                )}
              </div>
              <div>
                <p
                  className={`text-[12px] text-[#585858] font-medium ${
                    task.status.toLowerCase() === "incomplete"
                      ? ""
                      : "line-through"
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-[12px] text-[#585858]">{task.date}</p>
              </div>
            </div>
            <div className="flex gap-[1rem]">
              <ButtonIcon
                onClick={() => handleDeleteTask(task.id)}
                icon={<MdDelete color="#585858" size={20} />}
              />
              <ButtonIcon
                onClick={() => onEditTask(task)}
                icon={<MdEdit color="#585858" size={20} />}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
