import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { doc, getDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { db, auth } from "../../firebase/FirebaseConfig";
import { newUser } from "../../firebase/NewUser";

export default function ServiceProvider() {
  const navigate = useNavigate();

  const handleAuth = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("user:", user);
      console.log("Signed in as:", user.email);

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        navigate("/");
        toast.info("User already exists");
      } else {
        toast.success("Email verified successfully!");
        await newUser({ userId: user.uid });
        navigate("/");
      }
    } catch (error) {
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
    }
  };

  const handleGoogleAuth = () => handleAuth(new GoogleAuthProvider());
  const handleGithubAuth = () => handleAuth(new GithubAuthProvider());
  const handleFacebookAuth = () => handleAuth(new FacebookAuthProvider());

  return (
    <>
      <div className="tw-flex tw-justify-evenly tw-w-full tw-mt-4">
        <FontAwesomeIcon
          onClick={handleGoogleAuth}
          icon={faGoogle}
          className=" hover:tw-cursor-pointer "
          size="2x"
        />
        <FontAwesomeIcon
          icon={faFacebook}
          onClick={handleFacebookAuth}
          className=" hover:tw-cursor-pointer "
          size="2x"
        />
        <FontAwesomeIcon
          onClick={handleGithubAuth}
          className=" hover:tw-cursor-pointer "
          icon={faGithub}
          size="2x"
        />
      </div>
    </>
  );
}
