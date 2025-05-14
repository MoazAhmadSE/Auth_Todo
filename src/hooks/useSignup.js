import { useState } from "react";
import { EmailPasswordProvider } from "../components/firebaseServices/EmailPasswordProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useSignup = () => {
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
  const [passwordDidMatch, setPasswordDidMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (captchaToken) => {
    setIsUserNameEmpty(false);
    setUserMailIsEmpty(false);
    setValidEmail(true);
    setIsPasswordEmpty(false);
    setValidPassword(true);
    setIsConfirmPasswordEmpty(false);
    setPasswordDidMatch(true);

    if (userName.trim() === "") {
      setIsUserNameEmpty(true);
      return;
    } else if (userMail.trim() === "") {
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
    } else if (!captchaToken) {
      toast.error("Please verify you're not a robot.");
      return;
    } else if (userPassword === confirmUserPassword) {
      setLoading(true);
      await EmailPasswordProvider({
        userName,
        userMail,
        userPassword,
        navigate,
        setLoading,
      });
      setLoading(false);
    }
  };

  return {
    userName, userMail, userPassword, confirmUserPassword, isUserNameEmpty, isUserMailEmpty, validEmail, isPasswordEmpty, validPassword, isConfirmPasswordEmpty, passwordDidMatch, loading,
    setUserName, setIsUserNameEmpty, setUserMail, setUserMailIsEmpty, setValidEmail, setUserPassword, setIsPasswordEmpty, setValidPassword, setConfirmUserPassword, setIsConfirmPasswordEmpty, setPasswordDidMatch, handleSubmit,
  };
};
