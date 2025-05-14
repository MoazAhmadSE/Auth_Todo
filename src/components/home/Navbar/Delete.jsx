import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDeleteUser } from "../../../hooks/Home/Navbar/useDeleteUser";

export const Delete = () => {
 
  const { deleteAccount } = useDeleteUser();

  return (
    <div>
      <FontAwesomeIcon
        onClick={deleteAccount}
        icon={faTrash}
        className="tw-text-slate-300 tw-my-auto hover:tw-text-myYellow hover:tw-scale-125 tw-duration-300"
        title="Delete Account"
      />
    </div>
  );
};
