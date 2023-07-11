import useAuth from "./hooks/useAuth";

export default function NavBar() {
  const { signOutUser } = useAuth();

  return (
    <div className="col-span-2 flex items-center justify-between px-8">
      <h2 className="text-xl font-bold">Messages</h2>

      <button onClick={() => signOutUser()} className="rounded-xl bg-purple-500 px-5 py-2 text-white shadow-md transition hover:bg-purple-400">
        Sign Out
      </button>
    </div>
  );
}
