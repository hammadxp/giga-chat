import { auth, provider } from "/src/utils/firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { useStore } from "../stores/useStore";
import { useIsSignedIn } from "../stores/useIsSignedIn";
import { useCurrentRoom } from "../stores/useCurrentRoom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase-config";

export default function useAuth() {
  const { cookies, usersRef } = useStore();
  const { setIsSignedIn } = useIsSignedIn();
  const { setCurrentRoom } = useCurrentRoom();

  async function signInWithGoogle() {
    try {
      const authData = await signInWithPopup(auth, provider);
      const user = authData.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      // Only add user doc if user is signing in for the first time
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          joinedRooms: [],
        });
      }

      cookies.set("auth-token", authData?.user.refreshToken);
      setIsSignedIn(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function signOutUser() {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsSignedIn(false);
    setCurrentRoom(null);
  }

  return { signInWithGoogle, signOutUser };
}
