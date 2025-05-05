import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { persistor } from '../app/store';
import { toast } from "react-toastify";

export const Delete = () => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("username");

  const deleteAccount = async () => {
    console.log(user);
    persistor.purge();
    localStorage.removeItem(user);
    localStorage.removeItem("isLogin");
    sessionStorage.clear();
    navigate('/');
    toast.info("Account Deleted Sucessfully!");
  };
  return (
    <div>
      <FontAwesomeIcon
        onClick={deleteAccount}
        icon={faTrash}
        className="tw-text-slate-300 tw-my-auto hover:tw-text-myYellow hover:tw-scale-125 tw-duration-300"
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
