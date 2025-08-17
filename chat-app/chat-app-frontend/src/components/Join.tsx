import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinRoom({ wsRef }: { wsRef: React.RefObject<WebSocket | null> }) {
  const navigate = useNavigate();
  const [roomError, setRoomError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  function joinRoom() {
    const roomInput = document.getElementById("room") as HTMLInputElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const room = roomInput.value.trim();
    const name = nameInput.value.trim();

    if (!room) {
      setRoomError("Room ID cannot be empty");
      return;
    } else {
      setRoomError(null);
    }

    if (!name) {
      setNameError("Name cannot be empty");
      return;
    } else {
      setNameError(null);
    }

    wsRef.current?.send(
      JSON.stringify({
        type: "join",
        payload: { roomId: room, name: name },
      })
    );
  }

useEffect(() => {
  if (!wsRef.current) return;

  wsRef.current.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "join") {
      // Navigate using roomId directly from server
      navigate(`/room/${data.roomId}`);
    }

    if (data.type === "error") {
      setRoomError(data.message);
    }
  };
}, [wsRef, navigate]);

  return (
    <div className="text-white flex flex-col items-center">
      <h1 className="font-extrabold text-5xl text-center mt-50 mb-10">Join the metaverse</h1>

      <div className="bg-gray-800 content-center flex flex-col items-center px-34.5 py-10">
        <h2 className="font-bold text-2xl mb-4">Enter the room ID</h2>
        <input
          id="room"
          type="text"
          placeholder="Type here"
          className="border border-gray-500 bg-transparent text-white p-2 rounded-md mb-2"
        />
        {roomError && <h3 className="mb-4 text-red-400">{roomError}</h3>}

        <h3 className="font-bold text-2xl mb-4">Enter your name</h3>
        <input
          id="name"
          type="text"
          placeholder="Type here"
          className="border border-gray-500 bg-transparent text-white p-2 rounded-md mb-2"
        />
        {nameError && <h3 className="mb-5 text-red-400">{nameError}</h3>}

        <button
          onClick={joinRoom}
          className="bg-white text-black ml-5 rounded-2xl p-3 text-xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 active:bg-gray-600"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
