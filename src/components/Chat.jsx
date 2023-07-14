import { useEffect, useRef, useState } from "react";
import { useStore } from "./stores/useStore";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../utils/firebase-config";
import PopupMenuChat from "./PopupMenuChat";
import PopupMenuRoom from "./PopupMenuRoom";

export default function Chat() {
  const { currentRoom, currentUser, setCurrentRoom } = useStore();
  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState();
  const [newMessage, setNewMessage] = useState("");

  const dummy = useRef(null);

  // Fetch messages

  useEffect(() => {
    if (!currentRoom) return;

    setIsLoading(true);

    const messagesQuery = query(collection(db, "messages"), where("room", "==", currentRoom.id), orderBy("createdAt"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      let snapshotMessages = [];

      snapshot.forEach((doc) => {
        snapshotMessages.push({ ...doc.data(), id: doc.id });
      });

      snapshotMessages.length === 0 ? setMessages(null) : setMessages(snapshotMessages);
      setIsLoading(false);
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
      room: currentRoom.id,
      createdAt: serverTimestamp(),
      userPhotoURL: currentUser.photoURL,
      userDisplayName: currentUser.displayName,
      userId: currentUser.uid,
    });
  }

  // Scroll to newest message

  useEffect(() => {
    dummy.current && dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Markup

  return (
    <>
      {currentRoom ? (
        <div className="grid grid-rows-[auto,1fr,auto] overflow-auto rounded-xl bg-[#f4f4fa] 600px:rounded-none">
          <div className="flex items-center justify-between px-8 py-4 shadow-sm 600px:pl-4">
            <button onClick={() => setCurrentRoom(null)} className="hidden rounded-md px-3 py-1 600px:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-[#724ff9]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
            </button>
            <p>{currentRoom.id}</p>
            <PopupMenuRoom roomItem={currentRoom} />
          </div>

          <div className="h-full overflow-y-scroll p-4">
            {messages ? (
              isLoading ? (
                <div className="grid h-full w-full place-items-center">
                  <p>Loading...</p>
                </div>
              ) : (
                // Message area

                <div className="space-y-3 px-8 600px:px-0">
                  {messages.map((message) => (
                    <>
                      {currentUser.uid === message.userId ? (
                        <div key={message.id} className="group ml-auto flex w-full items-center justify-end gap-4">
                          <div className="invisible group-hover:visible">
                            {console.log(message)}
                            <PopupMenuChat messageItem={message} />
                          </div>
                          <p className="w-fit rounded-full rounded-br-xl bg-[#724ff9] px-4 py-2 text-lg font-medium text-white shadow-md">
                            {message.text}
                          </p>
                          <img src={message.userPhotoURL} alt="Account photo" className="h-10 w-10 rounded-full" />
                        </div>
                      ) : (
                        <div key={message.id} className="group ml-auto flex w-full items-center justify-start gap-4">
                          <img src={message.userPhotoURL} alt="Account photo" className="h-10 w-10 rounded-full" />
                          <p className="w-fit rounded-full rounded-bl-xl bg-[#ffffff] px-4 py-2 text-lg font-medium text-gray-700 shadow-md">
                            {message.text}
                          </p>
                          <div className="invisible group-hover:visible">
                            <PopupMenuChat messageItem={message} />
                          </div>
                        </div>
                      )}
                    </>
                  ))}

                  <div ref={dummy}></div>
                </div>
              )
            ) : (
              <div className="grid h-full w-full place-items-center">
                <div className="flex flex-col items-center gap-8">
                  <img src="images/illustrations/undraw_begin_chat_re_v0lw.svg" alt="Select a room placeholder photo" className="h-72 w-72" />
                  <p>Select a room to view it&#39;s chat</p>
                </div>
              </div>
            )}
          </div>

          {/* New message input area */}
          <div className="py-2">
            <form onSubmit={handleNewMessage} className="mx-auto flex max-w-2xl gap-2 py-1 600px:px-3">
              <input
                type="text"
                id="new-message"
                placeholder="Type message ..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full rounded-full px-8 py-4 text-lg ring-1 ring-[#724ff9]/80 focus:outline-none focus:ring-2 focus:ring-[#724ff9]"
              />
              <button type="submit" className="w-28 rounded-full bg-[#724ff9] text-white transition hover:bg-[#724ff9]/80">
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center rounded-xl bg-[#f4f4fa] 600px:hidden 600px:rounded-none">
          <div className="space-y-8">
            <img src="images/illustrations/undraw_begin_chat_re_v0lw.svg" alt="Select a room placeholder photo" className="h-72 w-72" />
            <p className="text-center">Select a room to view it&#39;s chat</p>
          </div>
        </div>
      )}
    </>
  );
}
