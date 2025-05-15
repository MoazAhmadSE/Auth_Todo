import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const uid = auth.currentUser?.uid;
    const userRef = doc(db, "users", uid);

    try {
      await updateDoc(userRef, { isOnline: false });
      await signOut(auth);
      localStorage.removeItem("userId");
      navigate("/login");
      toast.info("Logout Successfully!");
    } catch (error) {
      console.error("Error during logout or updating isOnline:", error);
      toast.error("Logout failed. Try again.");
    }
  };

  return {
    handleLogout
  }
};
