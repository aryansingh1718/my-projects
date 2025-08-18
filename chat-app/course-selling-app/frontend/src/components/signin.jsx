import { useNavigate } from "react-router-dom"

export default function Signin() {
    const navigate = useNavigate();
    return <div>
        <button onClick={() => {
            navigate("/adminSignin")
        }}>Signin as an admin</button><br></br><br></br>
        <button onClick={() => {
            navigate("/userSignin")
        }}>Signin as a user</button>
 </div>
}