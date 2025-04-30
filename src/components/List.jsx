import { useEffect } from "react";
import { useAddTask } from "../context/useTasksContext";
import { Title } from "./Title";
import { useSelector, useDispatch } from "react-redux";
import {
  addComplete,
  deleteComplete,
  deleteTodo,
  setUserTasks,
  editTodo
} from "../features/todoList/TodoListSlice";

export const List = () => {
  const { task, setTask } = useAddTask();
  const dispatch = useDispatch();
  const todoTask = useSelector((state) => state.todoList.todo);
  const completedTask = useSelector((state) => state.todoList.completed);

  const handleDeleteTodo = (index) => {
    dispatch(deleteTodo({ index }));
  };
  const handleDeleteComplete = (index) => {
    dispatch(deleteComplete({ index }));
  };

  const handleCompleteTodo = (index, completeTask) => {
    dispatch(addComplete({ index: index, addTaskCompleted: completeTask }));
  };

  const handleEditTodo = (index) => {
    if(!task){
      setTask(todoTask[index]);
      dispatch(editTodo({ index }));
    }
  }

  useEffect(() => {
    const user = sessionStorage.getItem("username");
    const isInitialized = sessionStorage.getItem("isInitialized");
    const isPersister = localStorage.getItem(`persist:${user}`);
    if (!isInitialized && !isPersister) {
      const userdata = JSON.parse(localStorage.getItem(user));
      if (userdata) {
        dispatch(
          setUserTasks({
            todo: userdata.todoList.todo,
            completed: userdata.todoList.completed,
          })
        );
      }
      sessionStorage.setItem("isInitialized", "true");
    }
  }, []);

  return (
    <div className="tw-w-screen tw-h-screen">
      <div className="tw-bg-transparent tw-border-2 tw-border-slate-600 md:tw-w-[40%] lg:tw-w-[40%] sm:tw-w-[95%] tw-mx-auto tw-rounded-lg tw-p-5 tw-h-[70%] tw-no-scrollbar tw-overflow-auto">
        {todoTask.length > 0 && (
          <div>
            <div className="tw-flex tw-justify-center">
              <Title title={"Todo"} />
            </div>
            <ul>
              {todoTask.map((todoTask, index) => (
                <li
                  key={index}
                  className="tw-flex tw-justify-between tw-gap-x-3 tw-mt-3 tw-border tw-border-myYellow tw-rounded-xl tw-p-4"
                >
                  <input
                    className="tw-accent-myYellow"
                    type="checkbox"
                    onChange={() => handleCompleteTodo(index, todoTask)}
                    checked={false}
                  />
                  <h3 className="tw-text-left tw-flex-1 tw-text-wrap tw-text-slate-100">
                    {todoTask}
                  </h3>
                  <button
                    className="tw-text-slate-500 hover:tw-underline hover:tw-scale-110 tw-duration-200 hover:tw-text-myYellow"
                    onClick={() => handleEditTodo(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="tw-text-slate-500 hover:tw-underline hover:tw-scale-110 tw-duration-200 hover:tw-text-red-600"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <hr className="tw-border tw-w-[50%] tw-border-slate-600 tw-my-5 tw-mx-auto" />
          </div>
        )}
        {completedTask.length > 0 && (
          <div>
            <div className="tw-flex tw-justify-center">
              <Title title={"Done"} />
            </div>
            <ul>
              {completedTask.map((todoTask, index) => (
                <li
                  key={index}
                  className="tw-flex tw-justify-between tw-gap-x-3 tw-mt-3 tw-border tw-border-slate-400 tw-rounded-xl tw-p-4"
                >
                  <h3 className="tw-text-left tw-flex-1 tw-text-wrap tw-text-slate-100">
                    {todoTask}
                  </h3>
                  <button
                    className="tw-text-red-600 tw-font-semibold hover:tw-underline hover:tw-scale-110 tw-duration-200"
                    onClick={() => handleDeleteComplete(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
