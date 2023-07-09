import { useState } from "react";

export default function RoomSelectionPage({ setRoom }) {
  const [roomInput, setRoomInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setRoom(roomInput);
    setRoomInput("");
  }

  return (
    <>
      {/* <h2>Type ID of the room you want to join</h2> */}

      <form onSubmit={handleSubmit}>
        <label htmlFor="room-input">Room ID:</label>
        <input
          type="text"
          id="room-input"
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          className="rounded-md px-3 py-1 text-xl ring-2 ring-slate-200 focus:outline-none focus:ring-4"
        />

        <button type="submit" className="rounded-md bg-slate-200 px-4 py-2 transition hover:bg-slate-300">
          Continue
        </button>
      </form>
    </>
  );
}
