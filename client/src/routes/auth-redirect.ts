// packages
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// local modules / components
import { useAuthContext } from "@/hooks/use-auth-context";

export default function AuthRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [user, navigate]);

  return children;
}
