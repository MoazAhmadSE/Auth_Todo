import { Input } from "../Input";
import Button from "../Button";
import { Loading2 } from "../Loading2";
import useAddTask from "../../hooks/Home/useAddTasks";

export const AddTasks = ({ userId }) => {
  const { task, setTask, loading, addTask, isEmpty, setisEmpty } = useAddTask(userId);

  return (
    <div className="tw-flex tw-items-center tw-w-[100%] tw-mt-5">
      <Input
        className={`tw-w-[80%] tw-text-slate-200 tw-bg-transparent tw-border tw-p-2 focus:tw-border-myYellow tw-rounded-xl tw-my-2 tw-outline-none tw-rounded-r-none ${isEmpty ? "tw-border-red-700" : "tw-border-slate-600"}`}
        type={"text"}
        placeholder={"Enter Task Here"}
        value={task}
        onChange={(e) => {setTask(e.target.value); setisEmpty(false)}}
      />
      <Button
        className="tw-w-[20%] tw-h-[40px] tw-flex tw-items-center tw-justify-center tw-bg-myYellow tw-text-myDark tw-border tw-border-myYellow tw-rounded-2xl tw-font-bold hover:tw-underline tw-duration-500 tw-rounded-l-none"
        // text={loading ? <Loading2 /> : "Add"}
        text={"Add"}
        onClick={addTask}
      />
    </div>
  );
};
