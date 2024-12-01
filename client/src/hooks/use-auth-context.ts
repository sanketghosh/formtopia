import { AuthContext } from "@/contexts/auth-context-provider";
import { useContext } from "react";

// using useAppContext app context hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "ERROR! useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};
