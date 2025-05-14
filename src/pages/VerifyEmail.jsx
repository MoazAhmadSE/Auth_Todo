import { useNavigate } from "react-router-dom";
import { useEmailVerification } from "../hooks/useEmailVerification";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { checking, resendVerification } = useEmailVerification({ navigate });

  return (
    <div className="tw-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-text-white">
      <h2 className="tw-text-2xl">Please verify your email address</h2>
      <p className="tw-my-4">
        Check your inbox and click the verification link.
      </p>
      <button
        onClick={resendVerification}
        disabled={checking}
        className="tw-bg-myYellow tw-text-myDark tw-font-bold tw-px-6 tw-py-2 tw-rounded-lg"
      >
        {checking ? "Resending..." : "Resend Email"}
      </button>
    </div>
  );
}
