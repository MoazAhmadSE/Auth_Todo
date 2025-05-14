import { useRef, useState } from "react";

export default function useCaptcha() {
  const captchaRef = useRef(null);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleCaptcha = (value) => {
    if (value) setIsCaptchaValid(true);
  };

  const getToken = () => {
    return captchaRef.current?.getValue();
  };

  return {
    captchaRef,
    isCaptchaValid,
    handleCaptcha,
    getToken,
  };
}
