import { useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function FirebaseActionRedirect() {
  const navigate = useNavigate();
  // const location = useLocation();
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (loading) return;

    // const params = new URLSearchParams(location.search);
    const mode = searchParams.get("mode");

    if (mode === "resetPassword") {
      navigate("/reset-password" + location.search, { replace: true });
    } else if (mode === "verifyEmail") {
      navigate("/VerifyEmail" + location.search, { replace: true });
    } else {
      user
        ? navigate("/home", { replace: true })
        : navigate("/login", { replace: true });
    }
  }, [searchParams, navigate, user, loading]);

  return null;
}
