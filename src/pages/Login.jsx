import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Title } from "../components/Title";
import { Navigate } from "react-router-dom";
import { useUserInfo } from "../context/UserContext";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [signinError, setSignInError] = useState(false);
  const { userName, setUserName, userPassword, setUserPassword } = useUserInfo();
  
  const handleSubmit = (e) => {
    const storedUser = JSON.parse(localStorage.getItem(userName));
    const storedUserPassword = JSON.parse(localStorage.getItem(userName)).password;
    console.log(storedUser);
    console.log(storedUserPassword);
    e.preventDefault();
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
      <div className="tw-text-slate-100 tw-border-2 tw-p-10 tw-rounded-2xl tw-border-myYellow tw-w-[30%] tw-items-center tw-flex tw-flex-col">
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
            <div className="tw-text-red-500 tw-text-[1.3vw]">
              Incorrect Username or Password.
            </div>
          )}
          <Button text={"Login"} type="submit" />
        </form>
        <div className="tw-flex tw-w-full tw-flex-nowrap tw-text-[1vw]">
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
