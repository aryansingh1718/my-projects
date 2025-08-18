import { useRef, useEffect} from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from "./components/Landing"
import CreateRoom from "./components/CreateRoom"
import ChatRoom from "./components/ChatRoom"
import Join from "./components/Join"


function App() {
    const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL);
    wsRef.current = ws;
    ws.onopen = () => { 
      console.log("Connected to WebSocket "); 
    }
  }, [])

  return (
    <div className="h-screen bg-black flex flex-col">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LandingPage></LandingPage>}></Route>
        <Route path = "/CreateRoom" element = {<CreateRoom wsRef={wsRef}></CreateRoom>}></Route>
        <Route path="/JoinRoom" element = {<Join wsRef={wsRef}></Join>}></Route>
        <Route path = "/room/:roomId" element = {<ChatRoom wsRef={wsRef}></ChatRoom>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
