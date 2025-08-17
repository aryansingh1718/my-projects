import { useState } from "react";

export function TextBox({ wsRef }: { wsRef: React.RefObject<WebSocket | null> }) {
  const [message, setMessage] = useState("");

  function sendMessage() {
    if (message.trim() && wsRef.current) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: { message },
        })
      );
      setMessage(""); // clear input
    }
  }

  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center p-3">
      <input
        type="text"
        placeholder="Type your message"
        className="flex-1 p-2 rounded-md bg-gray-800 text-white mr-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()} // send on Enter
      />
      <button
        className="bg-gray-800 px-4 py-2 rounded-md text-white hover:bg-gray-700 cursor-pointer"
        onClick={sendMessage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </button>
    </div>
  );
}
