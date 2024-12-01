// PACKAGES
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

// LOCAL MODULES
import { useAuthContext } from "@/hooks/use-auth-context";
import { LoginSchema } from "@/schemas";

// COMPONENTS
import AuthCard from "@/components/cards/auth-card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DEFAULT_AUTH_REDIRECT_ROUTE } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { loginAction } from "@/actions/auth.actions";
import { Loader2Icon } from "lucide-react";

export default function LoginForm() {
  const { updateUser } = useAuthContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: loginAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      updateUser(data?.data);
      navigate(`${DEFAULT_AUTH_REDIRECT_ROUTE}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const formSubmitHandler = (values: z.infer<typeof LoginSchema>) => {
    mutation.mutate(values);
    console.log(values);
  };

  // handles auto filling fields with guest user details
  function handleAddGuest() {
    const values = form.getValues();

    if (values.email || values.password) {
      toast.warning("Fields are already filled");
    } else {
      form.reset({
        email: "guest@mail.com",
        password: "123456",
      });
      toast.success("Guest credentials have been added.");
    }
  }

  return (
    <AuthCard
      title="Welcome Back!"
      description="Continue from where you left last time, your personal data is safe and secure with us."
      footer="If you don't have an account just create one by switching to register tab."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmitHandler)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@mail.com"
                      type="email"
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="nD9I1xTod6mN31"
                      type="password"
                      disabled={mutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-4 w-full" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
          <Button
            type="button"
            className="mt-4 w-full"
            variant={"secondary"}
            onClick={handleAddGuest}
          >
            Guest Credentials
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
