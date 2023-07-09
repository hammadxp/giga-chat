import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "/src/utils/firebase-config.js";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function SignInPage({ setIsSignedIn }) {
  async function signInWithGoogle() {
    try {
      const authData = await signInWithPopup(auth, provider);
      cookies.set("auth-token", authData.user.refreshToken);

      setIsSignedIn(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p>Sign In To Continue</p>
      <button onClick={signInWithGoogle} className="rounded-md bg-slate-200 px-4 py-2 transition hover:bg-slate-300">
        Sign In With Google
      </button>
    </div>
  );
}
