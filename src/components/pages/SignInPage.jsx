import useAuth from "../hooks/useAuth";

export default function SignInPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="grid h-screen w-full place-items-center">
      <div className="flex flex-col items-center">
        <img src="images/illustrations/undraw_welcome_cats_thqn.svg" alt="Sign in placeholder photo" className="h-52 w-72" />
        <button onClick={signInWithGoogle} className="rounded-lg bg-[#724ff9] px-6 py-3 text-xl text-white transition hover:bg-[#724ff9]/80">
          Sign In With Google
        </button>
      </div>
    </div>
  );
}
