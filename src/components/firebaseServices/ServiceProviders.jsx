// src/components/ServiceProvider.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../context/AuthContext";

export default function ServiceProvider() {
  const { loginWithPopupProvider } = useAuth();

  return (
    <div className="tw-flex tw-justify-evenly tw-w-full tw-mt-3">
      <FontAwesomeIcon
        onClick={() => loginWithPopupProvider("google.com")}
        icon={faGoogle}
        className="hover:tw-cursor-pointer"
        size="2x"
      />
      <FontAwesomeIcon
        onClick={() => loginWithPopupProvider("facebook.com")}
        icon={faFacebook}
        className="hover:tw-cursor-pointer"
        size="2x"
      />
      <FontAwesomeIcon
        onClick={() => loginWithPopupProvider("github.com")}
        icon={faGithub}
        className="hover:tw-cursor-pointer"
        size="2x"
      />
    </div>
  );
}
