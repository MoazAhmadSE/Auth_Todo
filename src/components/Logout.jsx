import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


export const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    }
    return(
        <FontAwesomeIcon onClick={handleLogout} icon={faRightFromBracket} className="tw-text-myDark tw-my-auto tw-mx-2 hover:tw-text-myYellow hover:tw-scale-125 tw-duration-300" title="Logout" />
    )
}