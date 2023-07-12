import { useEffect, useRef, useState } from "react";
import { useStore } from "./stores/useStore";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../utils/firebase-config";

export default function Chat() {
  const { currentRoom, currentUser } = useStore();
  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState();
  const [newMessage, setNewMessage] = useState("");

  const dummy = useRef(null);

  // Fetch messages

  useEffect(() => {
    setIsLoading(true);
    console.log("isLoading after setting to true", isLoading);

    const messagesQuery = query(collection(db, "messages"), where("room", "==", currentRoom), orderBy("createdAt"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      let snapshotMessages = [];

      snapshot.forEach((doc) => {
        snapshotMessages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(snapshotMessages);
      setIsLoading(false);
      console.log("isLoading after setting to false", isLoading);

      if (currentRoom && snapshotMessages.length === 0) {
        setMessages(null);
      }

      dummy.current?.scrollIntoView({
        behavior: "smooth",
      });
    });

    return () => unsubscribe();
  }, [currentRoom]);

  // Send message

  async function handleNewMessage(e) {
    e.preventDefault();
    if (!newMessage) return;

    setNewMessage("");

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      room: currentRoom,
      createdAt: serverTimestamp(),
      userPhotoURL: currentUser.photoURL,
      userDisplayName: currentUser.displayName,
      userId: currentUser.uid,
    });
  }

  // Markup

  return (
    <div className={`m-2 ml-0 grid grid-rows-[1fr,auto] rounded-xl bg-purple-100 ${!currentRoom && "place-items-center"}`}>
      {currentRoom ? (
        <>
          <div className="h-[30rem] overflow-y-scroll p-4">
            {messages ? (
              isLoading ? (
                <div className="grid h-full w-full place-items-center">
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-center gap-4 rounded-sm font-medium text-purple-950">
                      <img src={message.userPhotoURL} alt="" className="h-10 w-10 rounded-full" />
                      <div className="-space-y-1">
                        <span className="text-xs">{message.userDisplayName}</span>
                        <p className="text-lg">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="grid h-full w-full place-items-center">
                <p>No messages in this room</p>
              </div>
            )}

            <div ref={dummy}></div>
          </div>
          <div className="">
            <form onSubmit={handleNewMessage} className="mx-auto flex max-w-2xl gap-2 py-1">
              <input
                type="text"
                id="new-message"
                placeholder="Type message ..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full rounded-full px-8 py-4 text-lg ring-1 ring-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button type="submit" className="w-28 rounded-full bg-purple-500 text-white transition hover:bg-purple-400">
                Send
              </button>
            </form>
          </div>
        </>
      ) : (
        <p>Please select a room to view it&#39;s chat</p>
      )}
    </div>
  );
}
