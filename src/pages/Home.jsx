import { useNavigate } from "react-router-dom";
import { AddTasks } from "../components/AddTasks";
import { List } from "../components/List";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const name = sessionStorage.getItem("username");
    if (!name) {
      navigate("/");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="tw-min-h-screen sm:tw-w-[95%] md:tw-w-[60%] lg:tw-max-w-[35%] tw-flex tw-flex-col tw-items-center tw-mx-auto ">
        <AddTasks />
        <List />
      </div>
    </div>
  );
}
