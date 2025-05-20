import { Link } from "react-router-dom";
import { Title } from "../components/Title";
import { Input } from "../components/Input";
import Button from "../components/Button";
import Loading from "../components/Loading";
import ServiceProvider from "../components/firebaseServices/ServiceProviders";
import { useSignup } from "../hooks/useSignup";
import ReCAPTCHA from "react-google-recaptcha";
import useCaptcha from "../hooks/useCaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import { faEye } from '@fortawesome/free-solid-svg-icons';


export default function Signup() {
  const { value, focusRef, setValue, handleSubmit } = useSignup();

  const { captchaRef, isCaptchaValid, handleCaptcha, getToken } = useCaptcha();

  return (
    <div className="tw-bg-myDark tw-min-h-screen tw-min-w-full tw-flex tw-justify-center tw-items-center">
      <div className="tw-text-slate-100 tw-border-2 tw-px-10 tw-py-8 tw-rounded-2xl tw-border-myYellow md:tw-w-[40%] lg:tw-w-[30%] sm:tw-w-[95%] tw-items-center tw-flex tw-flex-col">
        <Title
          className="tw-text-myYellow tw-text-4xl tw-font-bold"
          title={"Sign Up"}
        />
        <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
        {!value.loading ? (
          <>
            <div>
              <Input
                ref={(el) => (focusRef.current.userName = el)}
                className={`tw-input-style ${
                  !value.isUserNameValid
                    ? "tw-border-red-600"
                    : "tw-border-slate-500"
                }`}
                type="text"
                placeholder="Enter User Name"
                value={value.userName}
                onChange={(e) => {
                  setValue((prev) => ({
                    ...prev,
                    userName: e.target.value,
                    isUserNameValid: true,
                  }));
                }}
              />
              <Input
                ref={(el) => (focusRef.current.userMail = el)}
                className={`tw-input-style ${
                  !value.isEmailValid
                    ? "tw-border-red-600"
                    : "tw-border-slate-500"
                }`}
                type="email"
                placeholder="Enter Email"
                value={value.userMail}
                onChange={(e) => {
                  setValue((prev) => ({
                    ...prev,
                    userMail: e.target.value,
                    isEmailValid: true,
                  }));
                }}
              />
              {!value.isEmailValid && (
                <div className="tw-text-red-500 tw-text-[1vw]">
                  Please enter a valid email address (e.g, name@example.com).
                </div>
              )}
              <div className="tw-relative">
                <Input
                  ref={(el) => (focusRef.current.userPassword = el)}
                  className={`tw-input-style ${
                    !value.isPasswordValid || !value.isPasswordMatch
                      ? "tw-border-red-600"
                      : "tw-border-slate-500"
                  }`}
                  type="password"
                  placeholder="Enter Password"
                  value={value.userPassword}
                  onChange={(e) => {
                    setValue((prev) => ({
                      ...prev,
                      userPassword: e.target.value,
                      isPasswordValid: true,
                    }));
                  }}
                />
                <FontAwesomeIcon icon={faEye} />
              </div>
              {!value.isPasswordValid && (
                <div className="tw-text-red-500 tw-text-[1vw]">
                  Password must be at least 6 characters long.
                </div>
              )}
              <Input
                ref={(el) => (focusRef.current.isPasswordMatch = el)}
                className={`tw-input-style ${
                  !value.isPasswordMatch
                    ? "tw-border-red-600"
                    : "tw-border-slate-500"
                }`}
                type="password"
                placeholder="Confirm Password"
                value={value.confirmUserPassword}
                onChange={(e) => {
                  setValue((prev) => ({
                    ...prev,
                    confirmUserPassword: e.target.value,
                    isPasswordMatch: true,
                  }));
                }}
              />
              {!value.isPasswordMatch && (
                <div className="tw-text-red-500 md:tw-text-[1vw] lg:tw-text-[1vw]">
                  Password and Confirm Password not matched.
                </div>
              )}
              <ReCAPTCHA
                className="tw-mt-3"
                sitekey="6Ldz0DcrAAAAAH8VZMwaRbcYhYWur8rpbGcvAAlY"
                theme="dark"
                onChange={handleCaptcha}
                ref={captchaRef}
              />
              <Button
                className={`tw-w-full tw-h-[48px] tw-border tw-rounded-lg tw-text-lg tw-py-2 tw-duration-500 tw-mt-4 tw-mb-2 tw-bg-myYellow tw-border-myYellow tw-text-myDark hover:tw-underline tw-font-bold tw-flex tw-items-center tw-justify-center ${
                  !isCaptchaValid
                    ? "tw-cursor-not-allowed"
                    : "tw-cursor-default"
                }`}
                text={"Create"}
                onClick={() => handleSubmit(getToken)}
              />
            </div>
            <div className="tw-flex tw-w-full tw-flex-nowrap md:tw-text-[1.5vw] lg:tw-text-[1vw] ">
              <h3>Already have an Account?</h3>
              <Link
                to={"/login"}
                className="tw-text-myYellow tw-underline tw-ml-1 "
              >
                Sign in
              </Link>
            </div>
            <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
            <ServiceProvider />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
