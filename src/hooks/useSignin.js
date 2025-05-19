import { useState } from "react";
import { toast } from "react-toastify";

export default function useSignin() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [signinError, setSignInError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = (resetPassword) => {
    if (!userEmail) {
      toast.error("Please enter Email Address.");
      setIsEmpty(true);
      return;
    }
    resetPassword(userEmail);
  };

  const handleLogin = async (isCaptchaValid, getToken, loginWithEmailPassword, resetCaptcha) => {

    if (!userEmail) {
      setIsEmpty(true);
      return;
    }

    if (!userPassword) {
      setIsPasswordEmpty(true);
      return;
    }

    const captchaToken = await getToken?.();
    if (!isCaptchaValid || !captchaToken) {
      toast.error("Please verify you're not a robot.");
      return;
    }
    setLoading(true);
    
    try {
      await loginWithEmailPassword(userEmail, userPassword);
    } catch (error) {
      console.error("Login Error: ", error);
      if (error.code === "auth/too-many-requests") {
        toast.error("Too many login attempts. Try again later.");
      } else if (error.code === "auth/invalid-credential") {
        setSignInError(true);
      } else {
        toast.error("Login failed.");
      }
    } finally {
      // resetCaptcha();
    }
    setLoading(false);
  };

  return {
    userEmail,
    userPassword,
    isEmpty,
    isPasswordEmpty,
    signinError,
    loading,
    setLoading,
    setUserEmail,
    setUserPassword,
    setIsEmpty,
    setIsPasswordEmpty,
    setSignInError,
    handleForgetPassword,
    handleLogin,
  };
}
