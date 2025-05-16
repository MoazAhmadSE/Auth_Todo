import { useRef, useState } from "react";

export default function useCaptcha() {
  const captchaRef = useRef(null);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleCaptcha = (value) => {
    if (value) {
      setIsCaptchaValid(true);
    } else {
      setIsCaptchaValid(false);
    }
  };

  const getToken = () => {
    return captchaRef.current?.getValue() || null;
  };

  const resetCaptcha = () => {
    captchaRef.current?.reset();
    setIsCaptchaValid(false);
  };

  return {
    captchaRef,
    isCaptchaValid,
    handleCaptcha,
    getToken,
    resetCaptcha,
  };
}
