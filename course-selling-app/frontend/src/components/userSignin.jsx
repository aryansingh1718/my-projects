import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserSignin() {
      const [username,setUsername] = useState("");
        const [password,setPassword] = useState("");
        const [successMsg,setSuccessMsg] = useState("");
        const navigate = useNavigate();

        async function UserSigninFunction(){
            try{
                const res = await axios.post("http://localhost:3000/user/signin",{
                    username,
                    password
                },{
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                setSuccessMsg("User logged in successfully");
                console.log(res.data.token);
                setTimeout(() => {
                navigate("/userHome")
                },500);
                localStorage.setItem("token", res.data.token);
                axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
            }
            catch(e){
                console.log(e.response.data.msg)

            }
        }

    return <div>
        <input placeholder="Enter your username" type = "text" onChange={(e) => {
            setUsername(e.target.value);
        }}></input><br></br><br></br>
        <input placeholder="Enter your password" type = "text" onChange={(e) => {
            setPassword(e.target.value);
        }}></input><br></br><br></br>
        <button onClick={UserSigninFunction}>signin</button>
        <div>{successMsg}</div><br></br><br></br>
        <button onClick={() => {
            navigate("/")
        }}>Go Back</button>
    </div>
   
}