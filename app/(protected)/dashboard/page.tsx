import { auth } from "@/auth";
export default async function page() {
  const session = await auth();
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
