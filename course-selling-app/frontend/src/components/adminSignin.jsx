import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminSignin() {
      const [username,setUsername] = useState("");
        const [password,setPassword] = useState("");
        const [successMsg,setSuccessMsg] = useState("");
        const navigate = useNavigate();

        async function AdminSigninFunction(){
            try{
                const res = await axios.post("https://course-selling-backend-fiib.onrender.com/admin/signin",{
                    username,
                    password
                },{
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                 setSuccessMsg("Admin logged in successfully");
                 console.log(res.data)   
                localStorage.setItem("token", res.data.token); 
                setTimeout(() => {
                navigate("/adminHome")
                },500);
            }
            catch(e){
                setSuccessMsg(e.response.data.msg);
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
        <button onClick={AdminSigninFunction}>signin</button>
        <div>{successMsg}</div><br></br><br></br>
         <button onClick={() => {
                navigate("/")
            }}>go back</button>
    </div>
   
}