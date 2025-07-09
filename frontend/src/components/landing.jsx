import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Landing() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [msg,setMsg] = useState("");

  const handleStartQuiz = async () => {
    try {
      const res = await axios.post("http://localhost:3000/signin", {
        username,
      });

      if (res.data.msg === "welcome to quiz") {
        setMsg(res.data.msg);
        setTimeout(() => {
            navigate("/startQuiz"); // go to quiz if user is new
        },500)
        localStorage.setItem("username",username)
        
      } else {
        setMsg(res.data.msg)
      }
    } catch (e) {
        setMsg(e.response?.data?.msg || "Something went wrong")
    }
  };

  return (
    <div className="h-screen w-full bg-gray-600 text-white p-4">
      <h1 className="text-4xl mb-4">Quiz Application</h1>

      <ol className="list-decimal pl-6 mb-4">
        <li>You will be asked 10 questions one after another.</li>
        <li>10 points are awarded for each correct answer.</li>
        <li>Each question has three options. You can choose only one option.</li>
        <li>You can review and change answers before the quiz finishes.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>

      <input
        type="text"
        placeholder="Enter username"
        className="text-white px-2 py-1 border-2 mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <button
        className="cursor-pointer border-2 px-4 py-2  text-white rounded "
        onClick={handleStartQuiz}
      >
        Start Quiz
      </button>
      <div>{msg}</div>
    </div>
  );
}