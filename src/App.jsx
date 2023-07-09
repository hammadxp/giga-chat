import SignInPage from "./components/pages/SignInPage";
import RoomSelectionPage from "./components/pages/RoomSelectionPage";
import MessagesPage from "./components/pages/MessagesPage";

import { useState } from "react";
import { auth } from "./utils/firebase-config";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  async function signOutUser() {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsSignedIn(false);
    setRoom(null);
  }

  if (!isSignedIn) {
    return (
      <div>
        <SignInPage setIsSignedIn={setIsSignedIn} />
      </div>
    );
  }

  return (
    <div>
      {room ? <MessagesPage room={room} /> : <RoomSelectionPage setRoom={setRoom} />}

      <div>
        <button onClick={signOutUser} className="rounded-md bg-slate-200 px-4 py-2 transition hover:bg-slate-300">
          Sign Out
        </button>
      </div>
    </div>
  );
}
