import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";

export const Logout = () => {
  
  const { logoutUser } = useAuth();

  return (
    <div>
      <FontAwesomeIcon
        onClick={logoutUser}
        icon={faRightFromBracket}
        className="tw-text-slate-300 tw-my-auto tw-mx-2 hover:tw-text-myYellow hover:tw-scale-125 tw-duration-300"
        title="Logout"
      />
    </div>
  );
};
