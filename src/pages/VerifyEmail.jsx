import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/FirebaseConfig";
import { newUser } from "../firebase/NewUser";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";
export default function VerifyEmail() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      await user.reload();

      if (user.emailVerified) {
        clearInterval(interval);
        toast.success("Email verified successfully!");
        await newUser({ userId: user.uid });
        navigate("/Home");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const resendVerification = async () => {
    setChecking(true);
    try {
      await sendEmailVerification(auth.currentUser);
      toast.info("Verification email resent.");
    } catch (err) {
      toast.error(`Error resending email. ${err}`);
    }
    setChecking(false);
  };

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
