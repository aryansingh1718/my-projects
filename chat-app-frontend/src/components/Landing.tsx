import { useNavigate } from "react-router-dom"

export default function LandingPage(){

    const navigate = useNavigate();

    return <div className="text-white flex flex-col items-center">
            <h1 className="font-extrabold text-5xl text-center mt-50 mb-10">Welcome to the metaverse</h1>
            <div className="bg-gray-800 content-center flex flex-col items-center p-20">
                <h3 className="font-bold text-2xl mb-4">You want to</h3>
                <div className="flex flex-row content-between">
                    <button className="bg-white text-black mr-5 rounded-2xl p-3 text-xl  cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 active:bg-gray-600" onClick={() => {
                        navigate("/CreateRoom")
                    }}>Create a room</button>
                    <button className="bg-white text-black ml-5 rounded-2xl p-3 text-xl cursor-pointer hover:bg-black hover:text-white transition-colors duration-200 active:bg-gray-600" onClick = {() => {
                        navigate("/JoinRoom")
                    }}>Join a room</button>
                </div>
            </div>
    </div>
}