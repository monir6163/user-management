import { auth } from "@/auth";
import DashboardProvider from "@/providers/dashboardProvider";
import { User } from "next-auth";
export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const user = session?.user as User;
  return (
    <>
      <DashboardProvider user={user}>{children}</DashboardProvider>
    </>
  );
}
