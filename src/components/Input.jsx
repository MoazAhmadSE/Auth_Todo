import { useAddTask } from "../context/TasksContext";
import { useUserInfo } from "../context/UserContext";

export const Input = ({ inputType, inputPlaceHolder, name }) => {
  const { userName, setUserName, userPassword, setUserPassword, confirmUserPassword, setConfirmUserPassword } = useUserInfo();
  const { task, settask } = useAddTask();
  const getValue = () => {
    if(name === "userName") return userName;
    if(name === "userPassword") return userPassword;
    if(name === "confirmUserPassword") return confirmUserPassword;
    if(name === "addTasks") return task;
    return '';
  }
  const handleInput = (e) => {
    if (name === "userName") setUserName(e.target.value);
    if (name === "userPassword") setUserPassword(e.target.value);
    if (name === "confirmUserPassword") setConfirmUserPassword(e.target.value);
    if (name === "addTasks") settask(e.target.value);
  };
  return (
    <input
      type={inputType}
      placeholder={inputPlaceHolder}
      onChange={handleInput}
      value={getValue()}
      required
      className="tw-w-full tw-text-slate-200 tw-bg-transparent tw-border-2 tw-border-slate-600 tw-p-2 focus:tw-border-myYellow tw-rounded-xl tw-my-2 tw-outline-none"
    />
  );
};
