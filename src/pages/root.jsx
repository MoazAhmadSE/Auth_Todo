import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function FirebaseActionRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");

    if (mode === "resetPassword") {
      navigate("/reset-password" + location.search, { replace: true });
    } else if (mode === "verifyEmail") {
      navigate("/VerifyEmail" + location.search, { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [location.search, navigate]);

  return null;
}
