import { Input } from "./Input";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoList/TodoListSlice";
import { useState } from "react";

export const AddTasks = () => {
  const [ task, setTask ] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (task) {
      dispatch(addTodo(task));
      setTask('');
    }
  };

  return (
    <div className="tw-flex tw-items-center tw-w-[100%] tw-mt-5">
      <Input
        className="tw-w-[80%] tw-text-slate-200 tw-bg-transparent tw-border tw-border-slate-600 tw-p-2 focus:tw-border-myYellow tw-rounded-xl tw-my-2 tw-outline-none tw-rounded-r-none"
        type={"text"}
        placeholder={"Enter Task Here"}
        value={task}
        onChange={(e) => {
          setTask(e.target.value)
        }}
      />
      <Button
        className={
          "tw-w-[20%] tw-bg-myYellow tw-text-myDark tw-border tw-border-myYellow tw-rounded-2xl tw-py-2 tw-font-bold hover:tw-underline tw-duration-500 tw-rounded-l-none"
        }
        text={"Add"}
        onClick={handleSubmit}
      />
    </div>
  );
};
