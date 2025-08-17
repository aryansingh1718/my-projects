import { useEffect, useState } from "react";

export function Chat({ wsRef }: { wsRef: React.RefObject<WebSocket | null> }) {
  const [messages, setMessages] = useState<
    { sender: string; text: string; self: boolean }[]
  >([]);

  useEffect(() => {
    if (!wsRef.current) return;

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "chat") {
        setMessages((prev) => [
          ...prev,
          {
            sender: data.from,
            text: data.message,
            self: data.self,
          },
        ]);
      }
    };
  }, [wsRef]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded-md max-w-xs break-words ${
                msg.self
                  ? "bg-black text-left"
                  : "bg-gray-700 text-left"
              }`}
            >
              <span className="block text-sm font-bold">
                {msg.self ? "You" : msg.sender}
              </span>
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
