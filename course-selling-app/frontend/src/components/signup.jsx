import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import AdminSignup from "./adminSignup.jsx"

export default function Signup() {
    const navigate = useNavigate();
    return <div>
        <button onClick={() => {
            navigate("/adminSignup")
        }}>Signup as an admin</button><br></br><br></br>
        <button onClick={() => {
            navigate("/userSignup")
        }}>Signup as a user</button>
 </div>
}
