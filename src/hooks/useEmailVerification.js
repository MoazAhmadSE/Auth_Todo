import { useEffect, useState } from "react";
import { auth, db } from "../firebase/FirebaseConfig";
import { newUser } from "../firebase/NewUser";
import { toast } from "react-toastify";
import { sendEmailVerification, applyActionCode } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useEmailVerification = () => {
  const [checking, setChecking] = useState(false);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const oobCode = searchParams.get("oobCode");
  const navigate = useNavigate();

  const Page = "VerifyEmail";
  const actionCodeSettings = {
    url: `http://localhost:5173/${Page}`,
    handleCodeInApp: true,
  };  

  useEffect(() => {
    const verifyEmail = async () => {
      if (oobCode) {
        setLoading(true)
        try {
          await applyActionCode(auth, oobCode);
          const user = auth.currentUser;
          if (user) {
            console.log(user);
            await newUser({ userId: user.uid });
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { isOnline: true });
            toast.success("Email verified successfully!");
            setTimeout(() => {
              navigate("/home");
            }, 1500);
          }
        } catch (err) {
          toast.error("Invalid or expired verification link.");
          console.error(err);
        }
        setLoading(false);
      }
    };

    verifyEmail();
  }, [oobCode, navigate]);

  const resendVerification = async () => {
    setChecking(true);
    try {
      await sendEmailVerification(auth.currentUser, actionCodeSettings);
      toast.info("Verification email resent.");
    } catch (err) {
      toast.error(`Error resending email: ${err.message}`);
    }
    setChecking(false);
  };

  return { checking, resendVerification, loading };
};
