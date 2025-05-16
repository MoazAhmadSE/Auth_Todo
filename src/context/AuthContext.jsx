import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../firebase/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { newUser } from "../firebase/NewUser";
import { useNavigate } from "react-router-dom";
import { SendVerificationMail } from "../components/firebaseServices/SendVerificationMail";
import { useLogout } from "../hooks/Home/Navbar/useLogout";
import { useDeleteUser } from "../hooks/Home/Navbar/useDeleteUser";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { handleLogout } = useLogout();
  const { deleteAccount } = useDeleteUser();

  const loginWithPopupProvider = async (providerName) => {
    let provider;
    switch (providerName) {
      case "google.com":
        provider = new GoogleAuthProvider();
        break;
      case "facebook.com":
        provider = new FacebookAuthProvider();
        break;
      case "github.com":
        provider = new GithubAuthProvider();
        break;
      default:
        toast.error("Unsupported provider");
        return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        await updateDoc(userDocRef, { isOnline: true });
        toast.success("Welcome Back!");
      } else {
        await newUser({ userId: user.uid });
        await updateDoc(userDocRef, { isOnline: true });
        toast.success("Account Created!");
      }

      navigate("/Home");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already registered.");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        toast.error("Email registered with another provider.");
      } else {
        console.error("Auth error:", error);
        toast.error("Login failed.");
      }
    }
  };

  const loginWithEmailPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      if (!user.emailVerified) {
          await SendVerificationMail(user);
          toast.error("First Verify Your Email. Check Your Mailbox.");
          signOut(auth);
      } else {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          await newUser({ userId: user.uid });
        }

        await updateDoc(userRef, { isOnline: true });
        toast.success("Successfully logged in.");
        setUser(user);
        navigate("/Home");
      }
    } catch (error) {
      console.error("Login Error: ", error);
      throw error;  
    }
  };

  const logoutUser = async () => {
    try {
      await handleLogout();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async () => {
    try {
      await deleteAccount();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() =>
        onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            setUser(firebaseUser);
          } else {
            setUser(null);
          }
          setLoading(false);
        })
      )
      .catch((error) => {
        console.error("Persistence error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithPopupProvider,
        loginWithEmailPassword,
        logoutUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};