import { Input } from "./Input";
import { Button } from "./Button";
import { useAddTask } from "../context/useTasksContext";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoList/TodoListSlice";

export const AddTasks = () => {
  const { task, setTask } = useAddTask();
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      dispatch(addTodo(task));
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
