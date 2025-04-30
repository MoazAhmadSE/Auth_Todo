import { Link, useNavigate } from "react-router-dom";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import Button from "../components/Button";
import { useUserInfo } from "../context/useUserContext";
import { useEffect, useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [userExist, setUserExist] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [passwordDidMAtch, setPasswordDidMatch] = useState(true);
  const {
    userName,
    setUserName,
    userPassword,
    setUserPassword,
    confirmUserPassword,
    setConfirmUserPassword,
  } = useUserInfo();

  useEffect(() => {
    return () => {
      setUserName("");
      setUserPassword("");
      setConfirmUserPassword("");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.getItem(userName)) {
      setUserExist(true);
    } else if (userPassword.length < 6) {
      setValidPassword(false);
    } else if (userPassword != confirmUserPassword) {
      setPasswordDidMatch(false);
    } else if (userPassword === confirmUserPassword) {
      localStorage.setItem(
        userName,
        JSON.stringify({
          password: userPassword,
          todoList: { todo: [], completed: [] },
        })
      );
      console.log("Sucessfully Signup");
      navigate("/");
    }
  };

  return (
    <div className="tw-bg-myDark tw-min-h-screen tw-min-w-full tw-flex tw-justify-center tw-items-center">
      <div className="tw-text-slate-100 tw-border-2 tw-p-10 tw-rounded-2xl tw-border-myYellow md:tw-w-[40%] lg:tw-w-[30%] sm:tw-w-[95%] tw-items-center tw-flex tw-flex-col">
        <Title title={"Sign Up"} />
        <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
        <form onSubmit={handleSubmit}>
          <Input
            inputType={"text"}
            inputPlaceHolder={"Enter User Name"}
            name={"userName"}
          />
          {userExist && (
            <div className="tw-text-red-500 tw-text-[1vw]">
              Username already Exists..
            </div>
          )}
          <Input
            inputType={"password"}
            inputPlaceHolder={"Enter Password"}
            name={"userPassword"}
          />
          {!validPassword && (
            <div className="tw-text-red-500 tw-text-[1vw]">
              Password must me greater then 5 chracters.
            </div>
          )}
          <Input
            inputType={"password"}
            inputPlaceHolder={"Confirm Password"}
            name={"confirmUserPassword"}
          />
          {!passwordDidMAtch && (
            <div className="tw-text-red-500 tw-text-[1vw]">
              Password and Confirm Password not matched.
            </div>
          )}
          <Button text={"Create"} type="submit" />
        </form>
        <div className="tw-flex tw-w-full tw-flex-nowrap tw-text-[1vw]">
          <h3>Already have an Account?</h3>
          <Link to={"/"} className="tw-text-myYellow tw-underline tw-ml-1 ">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
