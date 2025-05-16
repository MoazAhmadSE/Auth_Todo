import { toast } from "react-toastify";

import { doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db, auth } from "../../firebase/FirebaseConfig";
import { SendVerificationMail } from "./SendVerificationMail";

export const  EmailPasswordProvider = async (props) => {
  const { userName, userMail, userPassword, setLoading } = props;
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      userMail,
      userPassword
    );
    console.log("Result: ", result);
    const user = result.user;
    await updateProfile(user, {
      displayName: userName,
    });
    console.log("User: ", user);
    console.log("User Mail: ", user.email);
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      try {
        await SendVerificationMail(user);
        setLoading(false);
        toast.info("Verification email sent. Please check your inbox.");
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.error("Auth error:", error);
    if (error.code === "auth/email-already-in-use") {
      toast.error("This email is already registered.");
    } else if (
      error.code === "auth/account-exists-with-different-credential"
    ) {
      toast.error("This email is already registered with other provider.");
    } else {
      console.error("Auth error:", error);
      toast.error("An error occurred. Please try again.");
    }
    setLoading(false);
  }
};
