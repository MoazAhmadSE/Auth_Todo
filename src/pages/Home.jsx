import { AddTasks } from "../components/home/AddTasks";
import { List } from "../components/home/List";
import { Navbar } from "../components/home/Navbar/Navbar";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  console.log(user);
  if (loading) {
    return (
      <div className="tw-h-screen">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Navbar userName={user?.displayName || "User"} />
      <div className="tw-min-h-screen sm:tw-w-[95%] md:tw-w-[60%] lg:tw-max-w-[35%] tw-flex tw-flex-col tw-items-center tw-mx-auto">
        <AddTasks userId={user.uid} />
        <List userId={user.uid} />
      </div>
    </div>
  );
}
