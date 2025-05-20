import { useRef, useState } from "react";
import { EmailPasswordProvider } from "../components/firebaseServices/EmailPasswordProvider";
import { toast } from "react-toastify";

export const useSignup = () => {

  const [value, setValue] = useState({
    userName: "",
    userMail: "",
    userPassword: "123456",
    confirmUserPassword: "123456",
    isUserNameValid: true,
    isEmailValid: true,
    isPasswordValid: true,
    // isConfirmPasswordValid: true,
    isPasswordMatch: true,
    loading: false,
    emailPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  });

  const focusRef = useRef({
    userName: null,
    userMail: null,
    userPassword: null,
    isPasswordMatch: null,
  });

  const focusInput = (field) => {
    focusRef.current[field]?.focus();
  };


  const handleSubmit = async (captchaToken) => {
    setValue(prev => ({
      ...prev,
      isUserNameValid: true,
      isEmailValid: true,
      isPasswordValid: true,
      // isConfirmPasswordValid: true,
      isPasswordMatch: true,
      isCaptchaValid: true,
    }));
    const validations = {
      userName: () => {
        if (value.userName.trim() === "") {
          setValue(prev => ({ ...prev, isUserNameValid: false }));
          return false;
        }
        return true;
      },
      userMail: () => {
        if (!value.emailPattern.test(value.userMail)) {
          setValue(prev => ({ ...prev, isEmailValid: false }));
          return false;
        }
        return true;
      },
      userPassword: () => {
        if (value.userPassword.length < 6) {
          setValue(prev => ({ ...prev, isPasswordValid: false }));
          return false;
        }
        return true;
      },
      // confirmUserPassword: () => {
      //   if (value.confirmUserPassword.length < 6) {
      //     setValue(prev => ({ ...prev, isConfirmPasswordValid: false }));
      //     return false;
      //   }
      //   return true;
      // },
      isPasswordMatch: () => {
        if (value.userPassword !== value.confirmUserPassword) {
          setValue(prev => ({ ...prev, isPasswordMatch: false }));
          return false;
        }
        return true;
      },
      captcha: async () => {
        const token = await captchaToken();
        if (!token) {
          toast.warn("First Complete the Captcha")
          return false;
        }
        return true;
      },
    };
    for (const field in validations) {
      const valid = await validations[field]();
      if (!valid) {
        focusInput(field);
        return;
      }
    }
    setValue(prev => ({ ...prev, loading: true }));
    await EmailPasswordProvider({
      userName: value.userName,
      userMail: value.userMail,
      userPassword: value.userPassword,
      setLoading: loadingState => setValue(prev => ({ ...prev, loading: loadingState })),
    });
    setValue(prev => ({ ...prev, loading: false }));
  }

  return {
    value,
    focusRef,
    focusInput,
    setValue,
    handleSubmit,
  };
};
