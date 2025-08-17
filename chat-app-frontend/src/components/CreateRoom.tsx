import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoom({wsRef}: { wsRef: React.RefObject<WebSocket | null> }){
    const navigate = useNavigate();
    const [roomTaken,setRoomTaken] = useState<boolean | null>(null);
    const [nameGiven,setNameGiven] = useState<boolean | null>(true);
    const [roomGiven,setRoomGiven] = useState<boolean | null>(true);

    function makeRoom(){
        const roomInput = document.getElementById("room") as HTMLInputElement;
        const room = roomInput.value;
         const nameInput = document.getElementById("name") as HTMLInputElement;
        const name = nameInput.value;

        if(room === ""){
            setRoomGiven(false);
            return;
        }
        else{
            setRoomGiven(true);
        }
        if(name === ""){
            setNameGiven(false);
            return;
        }
        else{
            setNameGiven(true);
        }

        wsRef.current?.send(JSON.stringify({
            type:"create",
            payload:{
                roomId:room,
                name:name
            }
        }))
    }

    useEffect(() => {
        if(!wsRef.current) return;

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "create") {
               setRoomTaken(false);
                navigate(`/room/${data.roomId}`); 
            }

            if (data.type === "error") {
                setRoomTaken(true);
            }
        }
    },[wsRef,navigate])

    return <div className="text-white flex flex-col items-center">
            <h1 className="font-extrabold text-5xl text-center mt-50 mb-10">Welcome to the metaverse</h1>
            <div className="bg-gray-800 content-center flex flex-col items-center px-34.5 py-10">
                <h2 className="font-bold text-2xl mb-4">Enter the room ID</h2>
                <input id = "room"type ="text" placeholder="Type here" className="border border-gray-500 bg-transparent text-white p-2 rounded-md mb-2"></input>
                {roomGiven ? null : <h3 className = "mb-4">Room Id cannot be empty</h3>}
                { roomTaken !== null &&( roomTaken ? <h3 className = "mb-4"> This room id already exists</h3>:<h3 className = "mb-4">Creating room for you</h3>)}
                <h3 className="font-bold text-2xl mb-4">Enter your name</h3>
                <input id = "name" type ="text" placeholder="Type here" className="border border-gray-500 bg-transparent text-white p-2 rounded-md mb-2"></input>
                {nameGiven ? null : <h3 className = "mb-5">Name Id cannot be empty</h3>}
                <button className="bg-white text-black ml-5 rounded-2xl p-3 text-xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 active:bg-gray-600" onClick={makeRoom}> Create room</button>
            </div>
    </div>
}