import { Link, useNavigate } from "react-router-dom";
import { Title } from "../components/Title";
import Button from "../components/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../components/Input";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { useUserValidation } from "../hooks/useUserValidation";

export default function Signup() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");

  const { isEmpty, userExist, setIsEmpty } = useUserValidation(userName);
  const {
    isPasswordEmpty,
    validPassword,
    isConfirmPasswordEmpty,
    passwordDidMAtch,
    setIsPasswordEmpty,
    setValidPassword,
    setIsConfirmPasswordEmpty,
    setPasswordDidMatch,
    validate,
  } = usePasswordValidation();


  const handleSubmit = () => {
    if (userName === "") {
      setIsEmpty(true);
      return;
    }
    if (userExist)  return;
  
    const passwordValid = validate(userPassword, confirmUserPassword);
    if (!passwordValid) return;
  
    localStorage.setItem(
      userName,
      JSON.stringify({
        password: userPassword,
        todoList: { todo: [], completed: [] },
        isOnline: false,
      })
    );
    navigate("/");
    toast.success(
      `Account Created Successfully! Username: ${userName} Password: ${userPassword}`,
      { autoClose: false }
    );
  };
  

  return (
    <div className="tw-bg-myDark tw-min-h-screen tw-min-w-full tw-flex tw-justify-center tw-items-center">
      <div className="tw-text-slate-100 tw-border-2 tw-p-10 tw-rounded-2xl tw-border-myYellow md:tw-w-[40%] lg:tw-w-[30%] sm:tw-w-[95%] tw-items-center tw-flex tw-flex-col">
        <Title
          className="tw-text-myYellow tw-text-4xl tw-font-bold"
          title={"Sign Up"}
        />
        <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
        <div>
          <Input
            className={`tw-input-style ${
              userExist || isEmpty ? "tw-border-red-600" : "tw-border-slate-500"
            }`}
            type="text"
            placeholder="Enter User Name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value.trim().toLowerCase());
              setIsEmpty(false);
            }}
          />
          {userExist && (
            <div className="tw-text-red-500 tw-text-[1vw]">
              Username already Exists..
            </div>
          )}
          <Input
            className={`tw-input-style ${
              !validPassword || !passwordDidMAtch || isPasswordEmpty
                ? "tw-border-red-600"
                : "tw-border-slate-500"
            }`}
            type="password"
            placeholder="Enter Password"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value.trim());
              setValidPassword(true);
              setIsPasswordEmpty(false);
            }}
          />
          {!validPassword && (
            <div className="tw-text-red-500 tw-text-[1vw]">
              Password must be at least 6 characters long.
            </div>
          )}
          <Input
            className={`tw-input-style ${
              !passwordDidMAtch || isConfirmPasswordEmpty
                ? "tw-border-red-600"
                : "tw-border-slate-500"
            }`}
            type="password"
            placeholder="Confirm Password"
            value={confirmUserPassword}
            onChange={(e) => {
              setConfirmUserPassword(e.target.value.trim());
              setPasswordDidMatch(true);
              setIsConfirmPasswordEmpty(false);
            }}
          />
          {!passwordDidMAtch && (
            <div className="tw-text-red-500 md:tw-text-[1vw] lg:tw-text-[1vw]">
              Password and Confirm Password not matched.
            </div>
          )}
          <Button
            className={
              "tw-w-[100%] tw-bg-myYellow tw-text-myDark tw-border tw-border-myYellow tw-rounded-lg tw-text-lg tw-py-2 tw-font-bold hover:tw-underline tw-duration-500 tw-mt-4 tw-mb-2"
            }
            text={"Create"}
            onClick={handleSubmit}
          />
        </div>
        <div className="tw-flex tw-w-full tw-flex-nowrap md:tw-text-[1.5vw] lg:tw-text-[1vw] ">
          <h3>Already have an Account?</h3>
          <Link to={"/"} className="tw-text-myYellow tw-underline tw-ml-1 ">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
