import { Input } from "./Input";
import { Button } from "./Button";
import { useAddTask } from "../context/TasksContext";

export const AddTasks = () => {
  const { task, setTask } = useAddTask();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = sessionStorage?.getItem("username");
    console.log(user);
    const userData = JSON.parse(localStorage.getItem(user));
    console.log(userData);
    console.log(task);
    if (user && task) {
      console.log("Task ADDED");
      userData.todoList.todo.push(task.trim());
      console.log(userData);
      localStorage.setItem(user, JSON.stringify(userData));
      setTask("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="tw-flex tw-gap-x-5 tw-items-center tw-w-[45%] tw-m-auto"
    >
      <div className="tw-w-[79%] ">
        <Input
          inputType={"text"}
          inputPlaceHolder={"Enter Task Here"}
          name={"addTasks"}
        />
      </div>
      <div className="tw-w-[20%]">
        <Button text={"Add"} type={"submit"} />
      </div>
    </form>
  );
};
