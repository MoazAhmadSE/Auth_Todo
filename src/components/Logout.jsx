import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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
  
  return (
    <div>
      <FontAwesomeIcon
        onClick={handleLogout}
        icon={faRightFromBracket}
        className="tw-text-myDark tw-my-auto tw-mx-2 hover:tw-text-myYellow hover:tw-scale-125 tw-duration-300"
        title="Logout"
      />
    </div>
  );
};
