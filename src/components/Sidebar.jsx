import { serverTimestamp, setDoc, doc, updateDoc, arrayUnion, query, collection, getDoc, where, documentId, onSnapshot } from "firebase/firestore";
import { auth, db } from "../utils/firebase-config";
import { useStore } from "./stores/useStore";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { currentUser, rooms, setRooms, setCurrentRoom } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function getJoinedRooms() {
      const docSnap = await getDoc(doc(db, "users", currentUser.uid));
      const joinedRooms = docSnap?.data().joinedRooms;

      const roomsQuery = query(collection(db, "rooms"), where(documentId(), "in", joinedRooms));

      // Pedro
      onSnapshot(roomsQuery, (snapshot) => {
        let snapshotRooms = [];

        snapshot.forEach((doc) => {
          snapshotRooms.push({ ...doc.data(), id: doc.id });
        });

        setRooms(snapshotRooms);
        setIsLoading(false);
      });

      // Mine
      // const roomsQuerySnap = await getDocs(roomsQuery);
      // roomsQuerySnap.forEach((doc) => {
      //   setRooms(doc.data());
      // });
      // setIsLoading(false);
    }
    currentUser && isLoading && getJoinedRooms();

    return () => (isMounted = false);
  }, [currentUser]);

  async function createRoom() {
    const roomName = window.prompt("Enter name for the room you want to create:");

    await setDoc(doc(db, "rooms", roomName), {
      name: roomName,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.uid,
    });

    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      joinedRooms: arrayUnion(roomName),
    });
  }

  async function joinRoom() {
    const roomName = window.prompt("Enter name of the room you want to join:");

    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      joinedRooms: arrayUnion(roomName),
    });
  }

  return (
    <aside className="relative m-2 overflow-hidden rounded-xl bg-purple-100">
      <div className={`flex h-full w-full flex-col overflow-y-scroll ${isLoading && "items-center justify-center"}`}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => setCurrentRoom(room.id)}
              className="flex h-20 w-full cursor-pointer items-center gap-4 border-b-2 border-purple-200 bg-purple-100 px-6 py-4 text-black transition hover:bg-purple-200"
            >
              <div className="h-14 w-14 rounded-full bg-white"></div>
              <h3>{room.name}</h3>
            </div>
          ))
        )}
      </div>

      <div className="absolute bottom-4 left-1/2 flex min-w-max -translate-x-1/2 space-x-2">
        <button onClick={joinRoom} className="rounded-xl bg-purple-500 px-5 py-3 text-white shadow-md transition hover:bg-purple-400">
          Join a room
        </button>
        <button onClick={createRoom} className="rounded-xl bg-purple-500 px-5 py-3 text-white shadow-md transition hover:bg-purple-400">
          Create a room
        </button>
      </div>
    </aside>
  );
}
