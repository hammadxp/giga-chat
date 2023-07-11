import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../utils/firebase-config";
import { useCurrentRoom } from "./stores/useCurrentRoom";

export default function Chat({ room }) {
  const [messages, setMessages] = useState([]); // Local
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { currentRoom } = useCurrentRoom();

  {
    // import RoomSelectionPage from "./components/pages/RoomSelectionPage";
    /* {room ? <Chat room={room} /> : <RoomSelectionPage setRoom={setRoom} />} */
  }

  // Fetch messages

  useEffect(() => {
    const messagesQuery = query(messagesRef, where("room", "==", room), orderBy("createdAt"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      let snapshotMessages = [];

      snapshot.forEach((doc) => {
        snapshotMessages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(snapshotMessages);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Send message

  async function handleNewMessage(e) {
    e.preventDefault();
    if (!newMessage) return;

    setNewMessage("");

    await addDoc(messagesRef, {
      text: newMessage,
      room: room,
      createdAt: serverTimestamp(),
      userPhotoURL: auth.currentUser.photoURL,
      userDisplayName: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
    });
  }

  // Markup

  return (
    <div className="grid place-items-center bg-white">
      {currentRoom ? (
        <div className="grid grid-rows-[1fr,auto]">
          <div className="h-screen max-h-96 space-y-2 overflow-y-scroll">
            {isLoading ? (
              <div className="grid h-full w-full place-items-center">
                <div className="h-5 w-5 animate-spin bg-lime-400">
                  <svg className="mr-3 h-5 w-5 animate-spin text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div key={message.id} className="flex">
                    <p className="rounded-full bg-gradient-to-br from-pink-600 to-purple-800 px-4 py-2 text-white">{message.text}</p>
                    <span className="text-sm">{message.userDisplayName}</span>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="">
            <form onSubmit={handleNewMessage} className="mx-auto flex max-w-2xl">
              <input
                type="text"
                id="new-message"
                placeholder="Type message ..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full rounded-full px-8 py-4 text-lg ring-1 ring-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button type="submit" className="rounded-full bg-slate-200 px-4 py-2 transition hover:bg-slate-300">
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p>Please create or join a room</p>
      )}
    </div>
  );
}
