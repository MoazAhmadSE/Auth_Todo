import { Link, useNavigate } from "react-router-dom";
import { Title } from "../components/Title";
import Button from "../components/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../components/Input";
import { NewUser } from "../firebase/NewUser";
import Loading from "../components/loading";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { Loading2 } from "../components/Loading2";

export default function Signup() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [confirmUserPassword, setConfirmUserPassword] = useState("");
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
  const [passwordDidMAtch, setPasswordDidMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  if (loading) return <Loading />;

  const handleSubmit = async () => {
    if (userName === "") {
      setIsEmpty(true);
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
      const user = doc(db, "users", userName);
      const userExist = await getDoc(user);
      console.log(userExist);
      if (userExist.exists()) {
        setUserExist(true);
        return;
      } else {
        try {
          setLoading(true);
          await NewUser({ username: userName, userpassword: userPassword });
          setLoading(false);
          navigate("/");
          toast.success(
            `Account Created Successfully! Username: ${userName} Password: ${userPassword}`,
            { autoClose: false }
          );
        } catch (error) {
          setLoading(false);
          toast.error("Signup failed. Please try again. ", error);
        }
      }
    }
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
              setUserExist(false);
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
            className="tw-w-[100%] tw-border tw-rounded-lg tw-text-lg tw-py-2 tw-duration-500 tw-mt-4 tw-mb-2 tw-bg-myYellow tw-border-myYellow tw-text-myDark hover:tw-underline tw-font-bold"
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
