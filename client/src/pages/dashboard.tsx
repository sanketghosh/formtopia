import { logoutAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth-context-provider";
import { useMutation } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Dashboard() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      localStorage.removeItem("user_data");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
    // console.log(values);
  };

  return (
    <div>
      <h2>{user?.username}</h2>
      <form onSubmit={formSubmitHandler} className="m-10 w-32">
        <Button
          className="flex w-full cursor-pointer items-center justify-start gap-2"
          variant={"destructive"}
        >
          <LogOutIcon className="size-5" />
          Log out
        </Button>
      </form>
    </div>
  );
}
