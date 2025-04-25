import { useEffect } from "react";
import { useAddTask } from "../context/TasksContext";
import { Title } from "./Title";

export const List = () => {
  const { todo, setTodo, completedTask, setCompletedTask } = useAddTask();
  const user = sessionStorage?.getItem("username");
  const storedUser = JSON.parse(localStorage.getItem(user));

  
  const handleDeleteTodo = ( index , deleteTask ) => {
      const updatedTodoList = todo.filter((task , i) => i !== index || task !== deleteTask);
      setTodo(updatedTodoList);
      storedUser.todoList.todo = updatedTodoList;
      localStorage.setItem(user, JSON.stringify(storedUser));
  };
  const handleDeleteComplete = (index, deleteTask) => {
      const updatedCompleteList = completedTask.filter( (task, i) => i !== index || task !== deleteTask );
      setCompletedTask(updatedCompleteList);
      storedUser.todoList.completed = updatedCompleteList;
      localStorage.setItem(user, JSON.stringify(storedUser));
  };

  const handleCompleteTodo = (index , completeTask) => {
    const updatedTodoList = todo.filter((todo, i) => i !== index || todo !== completeTask);
    setTodo(updatedTodoList);
    const updatedCompletedList = [...completedTask, completeTask]; 
    setCompletedTask(updatedCompletedList);
    storedUser.todoList.todo = updatedTodoList;
    storedUser.todoList.completed = updatedCompletedList;
    localStorage.setItem(user, JSON.stringify(storedUser));
  };

  useEffect(() => {
    if (storedUser?.todoList?.todo) {
      setTodo(storedUser.todoList.todo);
      console.log("shown");
    }
    if (storedUser?.todoList?.completed) {
      setCompletedTask(storedUser.todoList.completed);
      console.log("completed tasks");
    }
  }, []);
  return (
    <div className="tw-w-screen tw-h-screen">
      <div className="tw-bg-transparent tw-border-2 tw-border-slate-600 tw-w-[45%] tw-mx-auto tw-rounded-lg tw-p-5 tw-h-[70%] tw-no-scrollbar tw-overflow-auto">
        {todo.length > 0 && (
          <div>
            <div className="tw-flex tw-justify-center">
              <Title title={"Todos"} />
            </div>
            <ul>
              {todo.map((todoTask, index) => (
                <li
                  key={index}
                  className="tw-flex tw-justify-between tw-gap-x-3 tw-mt-3 tw-border tw-border-myYellow tw-rounded-xl tw-p-4"
                >
                  <input
                    className="tw-accent-myYellow"
                    type="checkbox"
                    onClick={() => handleCompleteTodo( index , todoTask )}
                  />
                  <h3 className="tw-text-left tw-flex-1 tw-text-wrap tw-text-slate-100">
                    {todoTask}
                  </h3>
                  <button
                    className="tw-text-myYellow hover:tw-underline hover:tw-scale-110 tw-duration-200"
                    onClick={() => handleDeleteTodo( index , todoTask )}
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
              <Title title={"Completed"} />
            </div>
            <ul>
              {completedTask.map(( todoTask ,  index ) => (
                <li
                  key={index}
                  className="tw-flex tw-justify-between tw-gap-x-3 tw-mt-3 tw-border tw-border-slate-400 tw-rounded-xl tw-p-4"
                >
                  <h3 className="tw-text-left tw-flex-1 tw-text-wrap tw-text-slate-100">
                    {todoTask}
                  </h3>
                  <button
                    className="tw-text-red-600 tw-font-semibold hover:tw-underline hover:tw-scale-110 tw-duration-200"
                    onClick={() => handleDeleteComplete( index , todoTask)}
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
