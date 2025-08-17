import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  wsRef: React.RefObject<WebSocket | null>;
  room: string;
}

export default function Topbar({ wsRef, room }: TopbarProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!wsRef.current) return;

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Alert for anyone when someone leaves
      if (data.type === "leave") {
        alert(data.message);
      }
    };
  }, [wsRef]);

  function LeaveRoom() {
    // Notify backend that current user is leaving
    wsRef.current?.send(JSON.stringify({
      type: "leave",
      payload: {}
    }));

    // Navigate back to landing page
    navigate("/");
  }

  return (
    <div className="flex flex-row justify-between text-white mx-6 my-2">
      <span className="text-white text-4xl">Room: {room}</span>
      <button
        className="bg-white text-black rounded-2xl p-3 cursor-pointer hover:bg-gray-400"
        onClick={LeaveRoom}
      >
        Leave room
      </button>
    </div>
  )
}
