import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export const Logout = () => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("username");
  const userdata = JSON.parse(localStorage.getItem(user));
  const todoTask = useSelector((state) => state.todoList.todo);
  const completedTask = useSelector((state) => state.todoList.completed);

  const handleLogout = () => {
    userdata.todoList.todo = todoTask;
    userdata.todoList.completed = completedTask;
    localStorage.setItem(user, JSON.stringify(userdata));
    sessionStorage.clear();
    navigate("/");
  };
  const deleteAccount = async () => {
    console.log(user);
    localStorage.removeItem(user);
    sessionStorage.clear();
    navigate('/');
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
