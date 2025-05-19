import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import ServiceProvider from "../components/firebaseServices/ServiceProviders";
import ReCAPTCHA from "react-google-recaptcha";
import useSignin from "../hooks/useSignin";
import useCaptcha from "../hooks/useCaptcha";
import { useResetPassword } from "../hooks/useResetPassword";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { loginWithEmailPassword } = useAuth();

  const {
    userEmail,
    userPassword,
    isEmpty,
    isPasswordEmpty,
    signinError,
    loading,
    setUserEmail,
    setUserPassword,
    setIsEmpty,
    setIsPasswordEmpty,
    setSignInError,
    handleForgetPassword,
    handleLogin,
  } = useSignin();

  const { captchaRef, isCaptchaValid, handleCaptcha, getToken, resetCaptcha } =
    useCaptcha();

  const { resetPassword, error, isSuccess } = useResetPassword();

  const onLoginClick = () => {
    handleLogin(isCaptchaValid, getToken, loginWithEmailPassword, resetCaptcha);
  };

  return (
    <div className="tw-bg-myDark tw-min-h-screen tw-min-w-full tw-flex tw-justify-center tw-items-center">
      <div className="tw-text-slate-100 tw-border-2 tw-p-10 tw-rounded-2xl tw-border-myYellow md:tw-w-[40%] lg:tw-w-[30%] sm:tw-w-[95%] tw-items-center tw-flex tw-flex-col">
        <Title
          className="tw-text-myYellow tw-text-4xl tw-font-bold"
          title={"Login"}
        />
        <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
        <div>
          <Input
            className={`tw-input-style ${
              isEmpty || signinError
                ? "tw-border-red-600"
                : "tw-border-slate-600"
            }`}
            type="text"
            placeholder="Enter Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value.trim());
              setIsEmpty(false);
              setSignInError(false);
            }}
          />
          <Input
            className={`tw-input-style ${
              isPasswordEmpty || signinError
                ? "tw-border-red-600"
                : "tw-border-slate-600"
            }`}
            type="password"
            placeholder="Enter Password"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value.trim());
              setIsPasswordEmpty(false);
              setSignInError(false);
            }}
          />
          {signinError && (
            <div className="tw-text-red-500 md:tw-text-[1vw] lg:tw-text-[1vw]">
              Incorrect Email or Password.
            </div>
          )}
          <div
            className="tw-text-myYellow tw-font-thin tw-text-xs tw-flex tw-justify-end tw-mr-3 hover:tw-underline tw-cursor-pointer"
            onClick={() => handleForgetPassword(resetPassword)}
          >
            Forget Password
          </div>
          {error && (
            <div className="tw-text-red-500 md:tw-text-[1vw] lg:tw-text-[1vw]">
              {error}
            </div>
          )}
          {isSuccess && (
            <div className="tw-text-green-500 md:tw-text-[1vw] lg:tw-text-[1vw]">
              A password reset email has been sent!
            </div>
          )}
          <ReCAPTCHA
            className="tw-mt-3 tw-flex tw-justify-center"
            sitekey="6Ldz0DcrAAAAAH8VZMwaRbcYhYWur8rpbGcvAAlY"
            theme="dark"
            onChange={handleCaptcha}
            ref={captchaRef}
          />
          <Button
            className={`tw-w-[100%] tw-bg-myYellow tw-text-myDark tw-border tw-border-myYellow tw-rounded-lg tw-text-lg tw-py-2 tw-font-bold hover:tw-underline tw-duration-500 tw-mt-4 tw-mb-2 ${
              !isCaptchaValid || loading
                ? "tw-cursor-not-allowed"
                : "tw-cursor-pointer"
            }`}
            text={"Login"}
            type="button"
            onClick={onLoginClick}
            disabled={loading}
          />
        </div>
        <div className="tw-flex tw-w-full tw-flex-nowrap md:tw-text-[1.5vw] lg:tw-text-[1vw]">
          <h3>Don't have an Account?</h3>
          <Link
            to={"/signup"}
            className="tw-text-myYellow tw-underline tw-ml-1"
          >
            Sign Up
          </Link>
        </div>
        <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
        <ServiceProvider />
      </div>
    </div>
  );
}
