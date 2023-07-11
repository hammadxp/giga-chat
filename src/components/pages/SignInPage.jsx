import useAuth from "../hooks/useAuth";

export default function SignInPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div>
      <p>Sign In To Continue</p>
      <button onClick={signInWithGoogle} className="rounded-md bg-slate-200 px-4 py-2 transition hover:bg-slate-300">
        Sign In With Google
      </button>
    </div>
  );
}
