import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Title } from "../components/Title";
import Button from "../components/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../components/Input";
import Loading from "../components/loading";

import { doc, getDoc } from "firebase/firestore";
import { newUser } from "../firebase/newUser";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { db, auth } from "../firebase/firebaseConfig";

export default function Signup() {
  // const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [userPassword, setUserPassword] = useState("123456");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [confirmUserPassword, setConfirmUserPassword] = useState("123456");
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
          const result = await createUserWithEmailAndPassword(
            auth,
            userName,
            userPassword
          );
          console.log("Result: ", result);
          const user = result.user;
          console.log("Result: ", user.email);
          await sendEmailVerification(user);
          toast.info("Verification email sent. Please check your inbox.");
          await auth.currentUser.reload();
          console.log(user);
          console.log("DONE 1");
          if (auth.currentUser.emailVerified) {
            const userDoc = await getDoc(doc(db, "users", user.email));
            if (!userDoc.exists()) {
              console.log(user);
              await newUser({
                username: user.email.toLowerCase(),
                userpassword: "OAuth",
              });
            }
          } else {
            toast.warning("Please verify your email to continue.");
          }
          console.log("DONE 2");
        } catch (error) {
          console.error("Sign-in error:", error);
          toast.error("Sign-in failed. Try again.");
        }
        setLoading(false);
      }
    }
  };

  const handleAuth = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Result: ", result);
      const user = result.user;
      console.log("Result: ", user.email);

      const userDoc = await getDoc(doc(db, "users", user.email));
      if (!userDoc.exists()) {
        await newUser({
          username: user.email.toLowerCase(),
          userpassword: "OAuth",
        });
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("Sign-in failed. Try again.");
    }
  };

  const handleGoogleAuth = () => handleAuth(new GoogleAuthProvider());
  const handleGithubAuth = () => handleAuth(new GithubAuthProvider());
  const handleFacebookAuth = () => handleAuth(new FacebookAuthProvider());

  return (
    <>
      <div className="tw-bg-myDark tw-min-h-screen tw-min-w-full tw-flex tw-justify-center tw-items-center">
        <div className="tw-text-slate-100 tw-border-2 tw-p-10 tw-rounded-2xl tw-border-myYellow md:tw-w-[40%] lg:tw-w-[30%] sm:tw-w-[95%] tw-items-center tw-flex tw-flex-col ">
          <Title
            className="tw-text-myYellow tw-text-4xl tw-font-bold"
            title={"Sign Up"}
          />
          <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
          <div>
            <Input
              className={`tw-input-style ${
                userExist || isEmpty
                  ? "tw-border-red-600"
                  : "tw-border-slate-500"
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
          <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
          <div className="tw-flex tw-justify-between tw-w-full tw-mt-4">
            {/* <FontAwesomeIcon
              icon={faEnvelope}
              className=" hover:tw-cursor-pointer "
              size="2x"
            /> */}
            <FontAwesomeIcon
              onClick={handleGoogleAuth}
              icon={faGoogle}
              className=" hover:tw-cursor-pointer "
              size="2x"
            />
            <FontAwesomeIcon
              icon={faFacebook}
              onClick={handleFacebookAuth}
              className=" hover:tw-cursor-pointer "
              size="2x"
            />
            <FontAwesomeIcon
              onClick={handleGithubAuth}
              className=" hover:tw-cursor-pointer "
              icon={faGithub}
              size="2x"
            />
          </div>
        </div>
      </div>
    </>
  );
}
