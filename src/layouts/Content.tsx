import TaskControls from "../components/TaskControls";
import TaskList from "../components/TaskList";
import AddTaskModel from "../components/AddTaskModal";
import EditTaskModel from "../components/EditTaskModel";
import TimeStamp from "../common/TimeStamp";
import { useState, useEffect, useReducer } from "react";
import "@ant-design/v5-patch-for-react-19";
import { notification } from "antd";

type Task = {
  id: number;
  title: string;
  status: "incomplete" | "complete";
  date: string;
};

// Define action type for the reducer
type Action = { type: string };

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | "incomplete" | "complete">(
    "all"
  );

  // Define the success action types for notification messages
  const ADD_SUCCESS = "ADD_SUCCESS";
  const DELETE_SUCCESS = "DELETE_SUCCESS";
  const EDIT_SUCCESS = "EDIT_SUCCESS";
  const RESET_SUCCESS = "RESET_SUCCESS";
  const NOCHANGE_ERROR = "NOCHANGE_ERROR";
  const ENTERTITLE_ERROR = "ENTERTITLE_ERROR";

  // Reducer to handle success messages
  const reducer = (state: { [key: string]: boolean }, action: Action) => {
    switch (action.type) {
      case ADD_SUCCESS:
        return { ...state, addSuccess: true };
      case DELETE_SUCCESS:
        return { ...state, deleteSuccess: true };
      case EDIT_SUCCESS:
        return { ...state, editSuccess: true };
      case NOCHANGE_ERROR:
        return { ...state, noChangeError: true };
      case ENTERTITLE_ERROR:
        return { ...state, enterTitleError: true };
      case RESET_SUCCESS:
        return {
          addSuccess: false,
          deleteSuccess: false,
          editSuccess: false,
          noChangeError: false,
          enterTitleError: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    addSuccess: false,
    deleteSuccess: false,
    editSuccess: false,
    noChangeError: false,
    enterTitleError: false,
  });

  // Handle notifications when a task is added, deleted, or edited
  useEffect(() => {
    if (state.addSuccess) {
      notification.success({
        message: "Task added successfully",
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (state.deleteSuccess) {
      notification.success({
        message: "Task deleted successfully",
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (state.editSuccess) {
      notification.success({
        message: "Task edited successfully",
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (state.noChangeError) {
      notification.error({
        message: "No changes made",
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (state.enterTitleError) {
      notification.error({
        message: "Please enter a title",
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (
      state.addSuccess ||
      state.deleteSuccess ||
      state.editSuccess ||
      state.noChangeError ||
      state.enterTitleError
    ) {
      dispatch({ type: RESET_SUCCESS });
    }
  }, [state]);

  // Handlers for triggering success actions
  const handleAdd = () => dispatch({ type: ADD_SUCCESS });
  const handleDelete = () => dispatch({ type: DELETE_SUCCESS });
  const handleEdit = () => dispatch({ type: EDIT_SUCCESS });
  const handleNoChange = () => dispatch({ type: NOCHANGE_ERROR });
  const handleEnterTitle = () => dispatch({ type: ENTERTITLE_ERROR });

  
  const handleEditTaskClick = (task: Task) => {
    setTaskToEdit(task);
    setIsOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
    setTaskToEdit(null);
  };

  const handleAddTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addTask = (title: string, status: "incomplete" | "complete") => {
    const newTask: Task = {
      id: Date.now(),
      title,
      status,
      date: TimeStamp(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsModalOpen(false);
    handleAdd();
  };

  const editTask = (
    id: number,
    newTitle: string,
    newStatus: "incomplete" | "complete",
    newTime: string
  ) => {
    if (!newTitle.trim()) {
      handleEnterTitle();
      return;
    }
    const currentTask = tasks.find((task) => task.id === id);
    if (!currentTask) return;
    if (currentTask.title === newTitle) {
      handleNoChange();
      return;
    }
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title: newTitle, status: newStatus, date: newTime }
        : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsOpenEditModal(false);
    handleEdit();
  };

  const handleToggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "incomplete" ? "complete" : "incomplete",
            }
          : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleDelete();
  };

  const handleFilterChange = (filter: "all" | "incomplete" | "complete") => {
    setFilter(filter);
  };

  const filterTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="max-w-[750px] mx-auto flex flex-col gap-[1rem]">
      <TaskControls
        onAddTaskClick={handleAddTaskClick}
        onFilterChange={handleFilterChange}
        onAddSuccess={handleAdd}
      />
      <TaskList
        tasks={filterTasks}
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTaskClick}
        onDeleteSuccess={handleDelete}
      />
      {isModalOpen && (
        <AddTaskModel
          onClose={handleCloseModal}
          addTask={addTask}
          onEditSuccess={handleEdit}
        />
      )}
      {isOpenEditModal && taskToEdit && (
        <EditTaskModel
          task={taskToEdit}
          onClose={handleCloseEditModal}
          onSave={editTask}
          handleNoChange={handleNoChange}
          handleEnterTitle={handleEnterTitle}
        />
      )}
    </div>
  );
};

export default Content;
