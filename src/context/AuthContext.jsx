// src/context/AuthContext.jsx
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase/FirebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      await signInWithPopup(auth, provider);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() =>
        onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              provider: firebaseUser.providerData[0]?.providerId,
            });
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
      value={{ user, loading, loginWithPopupProvider, loginWithEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
