import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import Button from "../components/Button";
import { Title } from "../components/Title";
import { useResetPassword } from "../hooks/useResetPassword";
export default function ResetPassword() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    useResetPassword(email, newPassword)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="tw-bg-myDark tw-min-h-screen tw-flex tw-justify-center tw-items-center">
      <div className="tw-text-slate-100 tw-border-2 tw-p-10 tw-rounded-2xl tw-border-myYellow md:tw-w-[40%] lg:tw-w-[30%] sm:tw-w-[95%] tw-items-center tw-flex tw-flex-col">
        <Title
          className="tw-text-myYellow tw-text-4xl tw-font-bold"
          title={"Reset Password"}
        />
        <hr className="tw-border-2 tw-border-myYellow tw-w-full tw-my-5" />
        
        <div>
          <Input
            className="tw-input-style tw-border-slate-600 tw-text-slate-100 tw-bg-transparent tw-p-2 tw-rounded-xl tw-my-2"
            type="email"
            placeholder="Email"
            value={email}
            readOnly
          />
          <Input
            className={`tw-input-style ${newPassword ? "" : "tw-border-red-600"}`}
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            className={`tw-input-style ${confirmPassword ? "" : "tw-border-red-600"}`}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && (
            <div className="tw-text-red-500 md:tw-text-[1vw] lg:tw-text-[1vw]">
              {error}
            </div>
          )}
          <Button
            className="tw-w-[100%] tw-bg-myYellow tw-text-myDark tw-border tw-border-myYellow tw-rounded-lg tw-text-lg tw-py-2 tw-font-bold hover:tw-underline tw-duration-500 tw-mt-4 tw-mb-2"
            text={"Reset Password"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
