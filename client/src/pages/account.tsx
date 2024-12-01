import { useAuthContext } from "@/hooks/use-auth-context";

export default function Account() {
  const { user } = useAuthContext();

  return (
    <div className="">
      <div className="flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-lg bg-teal-800 text-2xl font-bold uppercase">
          {user?.username.charAt(0)}
        </div>
        <div>
          <h1 className="text-lg font-extrabold md:text-xl">
            @{user?.username}
          </h1>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
