import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faL,
  faRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Title } from "./Title";
import { useState } from "react";

export const Logout = () => {
  const navigate = useNavigate();
//   const [confirm, setConfirm] = useState(false);
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  const deleteAccount = () => {
    const username = sessionStorage.getItem("username");
    console.log(username);
    const userData = JSON.parse(localStorage.getItem(username));
    console.log(userData);
    if (username && userData) {
      localStorage.removeItem(username);
      handleLogout();
    }
  };
  return (
    <div>
      <FontAwesomeIcon
        onClick={handleLogout}
        icon={faRightFromBracket}
        className="tw-text-myDark tw-my-auto tw-mx-2 hover:tw-text-myYellow hover:tw-scale-125 tw-duration-300"
        title="Logout"
      />
      <FontAwesomeIcon
        onClick={deleteAccount}
        icon={faTrash}
        className="tw-text-myDark tw-my-auto hover:tw-text-myYellow hover:tw-scale-125 tw-duration-300"
        title="Delete Account"
      />
      {/* {confirm && (
        <div className="tw-mt-5 tw-p-4 tw-border tw-border-red-600 tw-rounded-lg">
        <Title title={"Delete Your Account"} />
        <div className="tw-flex tw-gap-4">
          <Button onClick={deleteAccount} text={"Yes, Delete"} />
          <Button onClick={() => setConfirm(false)} text={"Cancel"} />
        </div>
      </div>
      )} */}
    </div>
  );
};
