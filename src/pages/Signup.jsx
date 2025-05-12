import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";
import ServiceProvider from "../components/firebaseServices/ServiceProviders";
import { UsernamePasswordProvider } from "../components/firebaseServices/UsernamePasswordProvider";

export default function Signup() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("123456");
  const [confirmUserPassword, setConfirmUserPassword] = useState("123456");

  const [isUserNameEmpty, setIsUserNameEmpty] = useState(false);
  const [isUserMailEmpty, setUserMailIsEmpty] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
  const [passwordDidMAtch, setPasswordDidMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async () => {
    if (userMail === "") {
      setUserMailIsEmpty(true);
      return;
    } else if (!emailPattern.test(userMail)) {
      setValidEmail(false);
      return;
    } else if (userPassword === "") {
      setIsPasswordEmpty(true);
      return;
    } else if (userPassword.length < 6) {
      setValidPassword(false);
      return;
    } else if (confirmUserPassword === "") {
      setIsConfirmPasswordEmpty(true);
      return;
    } else if (userPassword !== confirmUserPassword) {
      setPasswordDidMatch(false);
      return;
    } else if (userPassword === confirmUserPassword) {
      setLoading(true);

      await UsernamePasswordProvider({
        userName,
        userMail,
        userPassword,
        navigate,
        setLoading,
      });

      setLoading(false);
    }
  };

  return (
    <>
      <div className="tw-bg-myDark tw-min-h-screen tw-min-w-full tw-flex tw-justify-center tw-items-center">
        <div className="tw-text-slate-100 tw-border-2 tw-p-10 tw-rounded-2xl tw-border-myYellow md:tw-w-[40%] lg:tw-w-[30%] sm:tw-w-[95%] tw-items-center tw-flex tw-flex-col ">
          <Title
            className="tw-text-myYellow tw-text-4xl tw-font-bold"
            title={"Sign Up"}
          />
          <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
          {!loading && (
            <>
              <div>
                <Input
                  className={`tw-input-style ${
                    isUserNameEmpty
                      ? "tw-border-red-600"
                      : "tw-border-slate-500"
                  }`}
                  type="text"
                  placeholder="Enter User Name"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setIsUserNameEmpty(false);
                  }}
                />
                <Input
                  className={`tw-input-style ${
                    isUserMailEmpty
                      ? "tw-border-red-600"
                      : "tw-border-slate-500"
                  }`}
                  type="email"
                  placeholder="Enter Email"
                  value={userMail}
                  onChange={(e) => {
                    setUserMail(e.target.value.trim());
                    setUserMailIsEmpty(false);
                    setValidEmail(true);
                  }}
                />
                {!validEmail && (
                  <div className="tw-text-red-500 tw-text-[1vw]">
                    Please enter a valid email address (e.g, name@example.com).
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
                  className="tw-w-full tw-h-[48px] tw-border tw-rounded-lg tw-text-lg tw-py-2 tw-duration-500 tw-mt-4 tw-mb-2 tw-bg-myYellow tw-border-myYellow tw-text-myDark hover:tw-underline tw-font-bold tw-flex tw-items-center tw-justify-center"
                  text={"Create"}
                  onClick={handleSubmit}
                />
              </div>
              <div className="tw-flex tw-w-full tw-flex-nowrap md:tw-text-[1.5vw] lg:tw-text-[1vw] ">
                <h3>Already have an Account?</h3>
                <Link
                  to={"/"}
                  className="tw-text-myYellow tw-underline tw-ml-1 "
                >
                  Sign in
                </Link>
              </div>
              <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
              <ServiceProvider />
            </>
          )}
          {loading && <Loading />}
        </div>
      </div>
    </>
  );
}
