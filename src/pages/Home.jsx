import { useNavigate } from "react-router-dom";
import { AddTasks } from "../components/AddTasks";
import { List } from "../components/List";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { auth } from "../firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        localStorage.setItem("userId", firebaseUser.uid);
      } else {
        navigate("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <Loading />;

  return (
    <div>
      <Navbar userName={user.displayName || "User"} />
      <div className="tw-min-h-screen sm:tw-w-[95%] md:tw-w-[60%] lg:tw-max-w-[35%] tw-flex tw-flex-col tw-items-center tw-mx-auto">
        <AddTasks userId={user.uid} />
        <List userId={user.uid} />
      </div>
    </div>
  );
}
