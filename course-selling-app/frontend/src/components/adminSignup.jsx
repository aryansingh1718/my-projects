import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"


export default function AdminSignup() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = useState("");


    
   async function AdminSignupFunction() {
  try {
    const res = await axios.post("http://localhost:3000/admin/signup", {
      username,
      password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if(res.data.msg == "enter correct inputs"){
       setSuccessMsg("enter correct inputs");    
    console.log(res.data); // Log response if needed
    }
    else{
      setSuccessMsg("Admin created successfully");  
    console.log(res.data); // Log response if needed

      setTimeout(() => {
    navigate("/adminHome")
    },500);

    }
   
    
  } catch (err) {
        console.log(err.response.data.msg) 
        setSuccessMsg("Admin with given credentials already exists")   
  }
}

    return <div>
        <input placeholder="Enter your username" type = "text" onChange={(e) => {
            setUsername(e.target.value);
        }}></input><br></br><br></br>
        <input placeholder="Enter your password" type = "text" onChange={(e) => {
            setPassword(e.target.value);
        }}></input><br></br><br></br>
        <button onClick={AdminSignupFunction}>signup</button>
        <div>
            <a>{successMsg}</a><br></br><br></br>
            <button onClick={() => {
                navigate("/")
            }}>go back</button>
            </div>
    </div>
   
}

