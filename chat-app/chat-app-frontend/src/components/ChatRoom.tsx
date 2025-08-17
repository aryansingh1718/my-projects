import { useParams } from "react-router-dom";
import { Chat } from "./Chat";
import { TextBox } from "./TextBox";
import Topbar from "./Topbar";

export default function ChatRoom({ wsRef }: { wsRef: React.RefObject<WebSocket | null> }) {
  const { roomId } = useParams<{ roomId: string }>(); // get roomId from URL

  return (
    <div className="flex flex-col h-screen">
      <Topbar wsRef={wsRef} room={roomId || ""} /> {/* pass roomId to Topbar */}
      <Chat wsRef={wsRef} />
      <TextBox wsRef={wsRef} />
    </div>
  );
}
