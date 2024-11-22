// packages
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// local modules / components
import { useAuthContext } from "@/contexts/auth-context-provider";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user, navigate]);

  return children;
}
