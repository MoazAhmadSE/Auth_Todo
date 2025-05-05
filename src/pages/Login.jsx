import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Title } from "../components/Title";
import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { persistor } from '../app/store';

export default function Login() {
  const navigate = useNavigate();
  const [signinError, setSignInError] = useState(false);
  const [userName, setUserName] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const handleSubmit = () => {
    const storedUser = JSON.parse(localStorage?.getItem(userName));
    const storedUserPassword = JSON.parse(
      localStorage?.getItem(userName)
    )?.password;
    if (userName === "") {
      setIsEmpty(true);
    } else if (userPassword == "") {
      setIsPasswordEmpty(true);
    } else if (storedUser && storedUserPassword === userPassword) {
      console.log("Login Sucessfully Sucessfully");
      sessionStorage.setItem("username", userName);
      localStorage.setItem("isLogin", userName);
      navigate("/home");
    } else {
      setSignInError(true);
    }
  };

  useEffect(() => {
    const isLogin = localStorage?.getItem("isLogin");
    console.log(isLogin);
    const user = JSON.parse(localStorage?.getItem(isLogin));
    console.log(user);
    if (isLogin && user) {
      sessionStorage.setItem("username", isLogin);
      navigate("/home");
    } else if (isLogin && !user) {
      localStorage.removeItem("isLogin");
      persistor.purge();
    }
  }, []);

  return (
    <div className="tw-bg-myDark tw-min-h-screen tw-min-w-full tw-flex tw-justify-center tw-items-center">
      <div className="tw-text-slate-100 tw-border-2 tw-p-10 tw-rounded-2xl tw-border-myYellow md:tw-w-[40%] lg:tw-w-[30%] sm:tw-w-[95%] tw-items-center tw-flex tw-flex-col">
        <Title
          className="tw-text-myYellow tw-text-4xl tw-font-bold"
          title={"Login"}
        />
        <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
        <div>
          <Input
            className={`tw-input-style ${
              isEmpty || signinError
                ? "tw-border-red-600"
                : "tw-border-slate-600"
            }`}
            type="text"
            placeholder="Enter User Name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value.trim().toLowerCase());
              setIsEmpty(false);
              setSignInError(false);
            }}
          />
          <Input
            className={`tw-input-style ${
              isPasswordEmpty || signinError
                ? "tw-border-red-600"
                : "tw-border-slate-600"
            }`}
            type="password"
            placeholder="Enter Password"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value.trim());
              setIsPasswordEmpty(false);
              setSignInError(false);
            }}
          />
          {signinError && (
            <div className="tw-text-red-500 md:tw-text-[1vw] lg:tw-text-[1vw]">
              Incorrect Username or Password.
            </div>
          )}
          <Button
            className={
              "tw-w-[100%] tw-bg-myYellow tw-text-myDark tw-border tw-border-myYellow tw-rounded-lg tw-text-lg tw-py-2 tw-font-bold hover:tw-underline tw-duration-500 tw-mt-4 tw-mb-2"
            }
            text={"Login"}
            type="submit"
            onClick={handleSubmit}
          />
        </div>
        <div className="tw-flex tw-w-full tw-flex-nowrap md:tw-text-[1.5vw] lg:tw-text-[1vw]">
          <h3>Didn't have any Account?</h3>
          <Link
            to={"/signup"}
            className="tw-text-myYellow tw-underline tw-ml-1 "
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
