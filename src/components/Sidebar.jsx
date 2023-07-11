import { addDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useStore } from "./stores/useStore";
import { auth, db } from "../utils/firebase-config";
import { useCurrentRoom } from "./stores/useCurrentRoom";

export default function Sidebar() {
  const { roomsRef } = useStore();
  const { setCurrentRoom } = useCurrentRoom();

  async function createRoom() {
    const roomName = window.prompt("Enter name for the room you want to create:");

    // await addDoc(roomsRef, {})
    await setDoc(doc(db, "rooms", roomName), {
      name: roomName,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.uid,
      joinedBy: [auth.currentUser.uid],
    });
  }

  async function joinRoom() {
    const roomName = window.prompt("Enter name of the room you want to join:");

    setCurrentRoom();
  }

  return (
    <aside className="relative m-2 grid place-items-center rounded-xl bg-purple-100">
      <div className="">
        <p>Sidebar</p>
      </div>

      <button
        onClick={joinRoom}
        className="absolute bottom-4 right-40 rounded-xl bg-purple-500 px-5 py-3 text-white shadow-md transition hover:bg-purple-400"
      >
        Join a room
      </button>
      <button
        onClick={createRoom}
        className="absolute bottom-4 right-4 rounded-xl bg-purple-500 px-5 py-3 text-white shadow-md transition hover:bg-purple-400"
      >
        Create a room
      </button>
    </aside>
  );
}
