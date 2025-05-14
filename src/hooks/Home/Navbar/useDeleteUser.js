import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteUser,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  reauthenticateWithPopup,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { db, auth } from "../../../firebase/FirebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export const useDeleteUser = () => {
  const navigate = useNavigate();

  const deleteAccount = async () => {
    const user = auth?.currentUser;
    if (!user) {
      toast.error("No authenticated user found.");
      return;
    }

    const authProvider = user.providerData[0]?.providerId;
    let provider;

    switch (authProvider) {
      case "google.com":
        provider = new GoogleAuthProvider();
        break;
      case "facebook.com":
        provider = new FacebookAuthProvider();
        break;
      case "github.com":
        provider = new GithubAuthProvider();
        break;
      case "password":
        provider = EmailAuthProvider;
        break;
      default:
        toast.error("Unsupported provider");
        return;
    }

    try {
      if (authProvider === "password") {
        const email = user.email;
        const password = await prompt("Please enter your password for reauthentication:");
        if (!password) {
          toast.error("Password is required for reauthentication.");
          return;
        }
        const credential = await EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);
      } else {
        toast.info("Re-authenticating, please confirm your identity.");
        await reauthenticateWithPopup(user, provider);
      }

      await deleteUser(user);
      await deleteDoc(doc(db, "tasks", user.uid));
      await deleteDoc(doc(db, "users", user.uid));
      localStorage.clear();
      toast.success("Account Deleted Successfully!");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-mismatch") {
        toast.warn("User mismatch detected.");
        console.warn("Reauthentication failed. Mismatch between user and credentials.");
      } else if (error.code === "auth/requires-recent-login") {
        toast.warn("Please sign in again to confirm account deletion.");
      } else {
        console.error("Error during account deletion:", error);
        toast.error("Deletion failed. Please try again later.");
      }
      if (auth.currentUser?.uid !== user.uid) {
        await auth.signOut();
        toast.warn("You were signed out. Please log in again with the correct account.");
        navigate("/");
      }
    }
  };

  return {deleteAccount}
};
