import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmPasswordReset, checkActionCode } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { Input } from "../components/Input";
import Button from "../components/Button";
import { Title } from "../components/Title";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
  const [passwordDidMatch, setPasswordDidMatch] = useState(true);
  const [error, setError] = useState("");

  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (oobCode) {
      checkActionCode(auth, oobCode)
        .then((info) => {
          console.log("Info", info);
          setEmail(info.data.email);
        })
        .catch((err) => {
          setError("Invalid-or-missing-reset-code");
          console.error(err);
        });
    } else {
      setError("No reset code found.");
    }
  }, [oobCode]);

  const handleSubmit = async () => {
    if (newPassword === "") {
      setIsPasswordEmpty(true);
      return;
    } else if (newPassword.length < 6) {
      setValidPassword(false);
      return;
    } else if (confirmPassword === "") {
      setIsConfirmPasswordEmpty(true);
      return;
    } else if (newPassword !== confirmPassword) {
      setPasswordDidMatch(false);
      return;
    }
    if (!oobCode) {
      setError("Invalid-or-missing-reset-code");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      navigate("/login");
      toast.info("Password Reset Sucessfully");
    } catch (err) {
      setError(err.code);
    }
  };

  return (
    <div className="tw-bg-myDark tw-min-h-screen tw-flex tw-justify-center tw-items-center">
      <div className="tw-text-slate-100 tw-border-2 tw-p-10 tw-rounded-2xl tw-border-myYellow md:tw-w-[40%] lg:tw-w-[30%] sm:tw-w-[95%] tw-items-center tw-flex tw-flex-col">
        <Title
          className="tw-text-myYellow tw-text-4xl tw-font-bold"
          title={"Reset Password"}
        />
        <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />

        {error === "Invalid-or-missing-reset-code" ? (
          <>
            <div className="tw-text-red-600 tw-flex tw-flex-col tw-items-center tw-font-extrabold tw-text-3xl tw-my-12">
              <p>Link is Invalid!</p>
              <p>Try Again</p>
            </div>
            <Button
              className="tw-w-[100%] tw-bg-myYellow tw-text-myDark tw-border tw-border-myYellow tw-rounded-lg tw-text-lg tw-py-2 tw-font-bold hover:tw-underline tw-duration-500 tw-mt-4 tw-mb-2"
              text={"Go To Login"}
              onClick={() => navigate("/login")}
            />
          </>
        ) : (
          <div>
            <Input
              className="tw-input-style tw-border-slate-600 tw-text-slate-100 tw-bg-transparent tw-p-2 tw-rounded-xl tw-my-2"
              type="email"
              placeholder="Email"
              value={email || ""}
              readOnly={"readOnly"}
            />
            <Input
              className={`tw-input-style ${
                !validPassword || !passwordDidMatch || isPasswordEmpty
                  ? "tw-border-red-600"
                  : "tw-border-slate-500"
              }`}
              type="password"
              placeholder="Enter Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value.trim());
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
                !passwordDidMatch || isConfirmPasswordEmpty
                  ? "tw-border-red-600"
                  : "tw-border-slate-500"
              }`}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value.trim());
                setPasswordDidMatch(true);
                setIsConfirmPasswordEmpty(false);
              }}
            />
            {!passwordDidMatch && (
              <div className="tw-text-red-500 md:tw-text-[1vw] lg:tw-text-[1vw]">
                Password and Confirm Password not matched.
              </div>
            )}
            <Button
              className="tw-w-[100%] tw-bg-myYellow tw-text-myDark tw-border tw-border-myYellow tw-rounded-lg tw-text-lg tw-py-2 tw-font-bold hover:tw-underline tw-duration-500 tw-mt-4 tw-mb-2"
              text={"Reset Password"}
              onClick={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
}
