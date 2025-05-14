import { useEffect, useState } from "react";
import { auth, db } from "../firebase/FirebaseConfig";
import { newUser } from "../firebase/NewUser";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const useEmailVerification = () => {
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      await user?.reload();

      if (user?.emailVerified) {
        clearInterval(interval);
        toast.success("Email verified successfully!");
        try {
          await newUser({ userId: user.uid });
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, { isOnline: true });
        } catch (error) {
          console.error("User doc update error:", error);
        }
        navigate("/Home");
        toast.info("Successfully Logged In");
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
      toast.error(`Error resending email: ${err.message}`);
    }
    setChecking(false);
  };

  return { checking, resendVerification };
};
