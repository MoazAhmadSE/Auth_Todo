import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function useSignin() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [signinError, setSignInError] = useState(false);
  const [disableButton, setdisableButton] = useState(false);

  const handleSubmit = async (captchaToken) => {
    if (userEmail === "") {
      setIsEmpty(true);
      return;
    } else if (userPassword === "") {
      setIsPasswordEmpty(true);
      return;
    } else if (!captchaToken) {
      toast.error("Please verify you're not a robot.");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, userEmail, userPassword);
      const user = result.user;

      if (!user.emailVerified) {
        toast.error("Email not verified.");
        navigate("/VerifyEmail");
        return;
      }

      const uid = user.uid;
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { isOnline: true });

      toast.success("Successfully logged in.");
      navigate("/Home");
    } catch (error) {
      console.error("Login Error: ", error);
      if (error.code === "auth/too-many-requests") {
        toast.error("Too many login attempts. Try again later.");
      } else if (error.code === "auth/invalid-credential") {
        setSignInError(true);
      } else {
        toast.error("Login failed.");
      }
    }
  };

  const handleForgetPassword = (resetPassword) => {
    if (!userEmail) {
      toast.error("Please enter Email Address.");
      setIsEmpty(true);
      return;
    }
    resetPassword(userEmail);
  };

  return {
    userEmail,
    userPassword,
    isEmpty,
    isPasswordEmpty,
    signinError,
    disableButton,
    setUserEmail,
    setUserPassword,
    setIsEmpty,
    setIsPasswordEmpty,
    setSignInError,
    handleSubmit,
    setdisableButton,
    handleForgetPassword,
  };
}
