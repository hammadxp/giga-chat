import SignInPage from "./components/pages/SignInPage";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStore } from "./components/stores/useStore";

export default function App() {
  const { isSignedIn, setIsSignedIn } = useStore();

  if (!isSignedIn) {
    return (
      <div>
        <SignInPage setIsSignedIn={setIsSignedIn} />
      </div>
    );
  }

  return (
    <div className="grid h-screen grid-cols-[2fr,5fr] grid-rows-[auto,1fr] gap-2 bg-white p-2 600px:grid-cols-1 600px:grid-rows-[1fr,auto] 600px:gap-0 600px:p-0">
      <NavBar />
      <Sidebar />
      <Chat />
    </div>
  );
}
