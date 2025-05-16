import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";

export const Delete = () => {
 
  const { deleteUser } = useAuth();

  return (
    <div>
      <FontAwesomeIcon
        onClick={deleteUser}
        icon={faTrash}
        className="tw-text-slate-300 tw-my-auto hover:tw-text-myYellow hover:tw-scale-125 tw-duration-300"
        title="Delete Account"
      />
    </div>
  );
};
