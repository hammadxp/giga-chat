import SignInPage from "./components/pages/SignInPage";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useIsSignedIn } from "./components/stores/useIsSignedIn";

export default function App() {
  const { isSignedIn, setIsSignedIn } = useIsSignedIn();

  if (!isSignedIn) {
    return (
      <div>
        <SignInPage setIsSignedIn={setIsSignedIn} />
      </div>
    );
  }

  return (
    <div className="grid min-h-screen grid-cols-[2fr,5fr] grid-rows-[72px,auto] bg-white">
      <NavBar />
      <Sidebar />
      {/* <Chat /> */}
    </div>
  );
}
