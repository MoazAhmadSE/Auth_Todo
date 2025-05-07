import { useState } from "react";

export const useLoginValidation = (navigate) => {
  const [signinError, setSignInError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const validateAndLogin = (userName, userPassword) => {
    const storedUser = JSON.parse(localStorage?.getItem(userName));
    const storedUserPassword = storedUser?.password;

    if (userName === "") {
      setIsEmpty(true);
      return;
    } else if (userPassword === "") {
      setIsPasswordEmpty(true);
      return;
    } else if (storedUser && storedUserPassword === userPassword) {
      sessionStorage.setItem("username", userName);
      localStorage.setItem("isLogin", userName);
      navigate("/home");
    } else {
      setSignInError(true);
    }
  };

  return {
    signinError,
    isEmpty,
    isPasswordEmpty,
    setSignInError,
    setIsEmpty,
    setIsPasswordEmpty,
    validateAndLogin,
  };
};
