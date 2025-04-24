import { useUserInfo } from "../context/UserContext";

export const Input = ({ inputType, inputPlaceHolder, name }) => {
  const { userName, setUserName, userPassword, setUserPassword, confirmUserPassword, setConfirmUserPassword } = useUserInfo();
  const getValue = () => {
    if(name === "userName") return userName;
    if(name === "userPassword") return userPassword;
    if(name === "confirmUserPassword") return confirmUserPassword;
    return '';
  }
  const handleInput = (e) => {
    if (name === "userName") setUserName(e.target.value);
    if (name === "userPassword") setUserPassword(e.target.value);
    if (name === "confirmUserPassword") setConfirmUserPassword(e.target.value);
  };
  return (
    <input
      type={inputType}
      placeholder={inputPlaceHolder}
      onChange={handleInput}
      value={getValue()}
      required
      className="tw-w-full tw-bg-transparent tw-border-2 tw-border-slate-600 tw-p-2 focus:tw-border-myYellow tw-rounded-xl tw-my-2 tw-outline-none"
    />
  );
};
