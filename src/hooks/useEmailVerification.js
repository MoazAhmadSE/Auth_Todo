import { useEffect, useState } from "react";
import { auth } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { applyActionCode, signOut } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SendVerificationMail } from "../components/firebaseServices/SendVerificationMail";

export const useEmailVerification = () => {
  const [checking, setChecking] = useState(false);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const oobCode = searchParams.get("oobCode");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (oobCode) {
        setLoading(true)
        setTimeout(async () => {
          try {
            await applyActionCode(auth, oobCode);
            const user = auth?.currentUser;
            if (user) {
              console.log(user);
              toast.success("Email verified successfully!");
              signOut(auth);
            }
          } catch (err) {
            toast.error("Invalid or expired verification link.");
            console.error(err);
          }
          navigate("/");
          setLoading(false);
        }, 5000);
      }
    };

    verifyEmail();
  }, [oobCode, navigate]);

  const resendVerification = async () => {
    setChecking(true);
    try {
      await SendVerificationMail(auth.currentUser);
      toast.info("Verification email resent.");
    } catch (err) {
      toast.error(`Error resending email: ${err.message}`);
    }
    setChecking(false);
  };

  return { checking, resendVerification, loading };
};
