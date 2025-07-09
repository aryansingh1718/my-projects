import { useNavigate } from "react-router-dom"

export default function Landing(){
    const navigate = useNavigate();
   return <div>
        Welcome to course selling app <br></br><br></br>
        <button onClick={() => {
            navigate("/signup")
        }}>signup</button><br></br><br></br>
        <button onClick={() => {
            navigate("/signin")
        }}>signin</button>
    </div>
}