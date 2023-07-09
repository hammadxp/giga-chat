import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, database } from "../../utils/firebase-config";

export default function MessagesPage({ room }) {
  const messagesRef = collection(database, "messages"); // Cloud
  const [messages, setMessages] = useState([]); // Local
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages

  useEffect(() => {
    const messagesQuery = query(messagesRef, where("room", "==", room), orderBy("createdAt"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      let snapshotMessages = [];

      snapshot.forEach((doc) => {
        snapshotMessages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(snapshotMessages);
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

  return (
    <>
      <p>Messages</p>

      <div className="h-72 space-y-2 overflow-y-scroll bg-slate-50">
        {messages.map((message) => (
          <div key={message.id} className="flex">
            <p className="rounded-md bg-slate-200 px-4 py-2">{message.text}</p>
            <span className="text-sm">{message.userDisplayName}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleNewMessage} className="fixed bottom-0 left-0 w-full bg-slate-300">
        <input
          type="text"
          id="new-message"
          placeholder="Type message ..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="rounded-md px-3 py-1 text-xl ring-2 ring-slate-200 focus:outline-none focus:ring-4"
        />
        <button type="submit" className="rounded-md bg-slate-200 px-4 py-2 transition hover:bg-slate-300">
          Send
        </button>
      </form>
    </>
  );
}
