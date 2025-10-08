import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthLogout() {
  const { push } = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    push("/login");
  };
  return <div onClick={handleLogout}>Logout</div>;
}
