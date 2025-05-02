import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { Title } from "../components/Title";
import { useUserInfo } from "../context/useUserContext";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [signinError, setSignInError] = useState(false);
  const { userName, setUserName, userPassword, setUserPassword } = useUserInfo();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage?.getItem(userName));
    const storedUserPassword = JSON.parse(localStorage?.getItem(userName))?.password;
    if (storedUser && storedUserPassword === userPassword) {
      console.log("Login Sucessfully Sucessfully");
      sessionStorage.setItem("username", userName);
      navigate("/home");
    } else {
      setSignInError(true);
    }
  };
    useEffect(()=>{
      return () => {
          setUserName("");
          setUserPassword("");
      };
    },[])
  return (
    <div className="tw-bg-myDark tw-min-h-screen tw-min-w-full tw-flex tw-justify-center tw-items-center">
      <div className="tw-text-slate-100 tw-border-2 tw-p-10 tw-rounded-2xl tw-border-myYellow md:tw-w-[40%] lg:tw-w-[30%] sm:tw-w-[95%] tw-items-center tw-flex tw-flex-col">
        <Title title={"Login"} />
        <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
        <form onSubmit={handleSubmit}>
          <Input
            inputType={"text"}
            inputPlaceHolder={"Enter User Name"}
            name={"userName"}
          />
          <Input
            inputType={"password"}
            inputPlaceHolder={"Enter Password"}
            name={"userPassword"}
          />
          {signinError && (
            <div className="tw-text-red-500 md:tw-text-[1vw] lg:tw-text-[1vw]">
              Incorrect Username or Password.
            </div>
          )}
          <Button text={"Login"} type="submit" />
        </form>
        <div className="tw-flex tw-w-full tw-flex-nowrap md:tw-text-[1vw] lg:tw-text-[1vw]">
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
