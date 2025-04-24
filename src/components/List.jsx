import { useEffect, useState } from "react";
import { useAddTask } from "../context/TasksContext";

export const List = () => {
  const { task } = useAddTask();
  const user = sessionStorage.getItem("username");
  const [userTodoList, setUserTodoList] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(user));
    if (storedUser?.todoList?.todo) {
      setUserTodoList(storedUser.todoList.todo);
    }
  }, [task]);

  return (
    <div className="tw-w-screen tw-h-screen">
      <div className="tw-bg-slate-700 tw-w-[60%] tw-mx-auto tw-rounded-lg tw-p-5 tw-h-[70%] tw-overflow-auto">
        <ul>
          {userTodoList.map((todoTask, index) => (
            <li
              key={index}
              className="tw-flex tw-justify-between tw-gap-x-3 tw-mt-3 tw-border tw-border-myYellow tw-rounded-xl tw-p-4"
            >
              <input className="tw-accent-myYellow" type="checkbox" />
              <h3 className="tw-text-left tw-flex-1">{todoTask}</h3>
              <button className="tw-text-myYellow tw-underline hover:tw-scale-110 tw-duration-200">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
