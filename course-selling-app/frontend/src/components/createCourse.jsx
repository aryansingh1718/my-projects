import { useState } from "react"
import axios from "axios";

export default function CreateCourse(){
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [tutor,setTutor] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    
    async function AdminCreate() {
        try{
            const token = localStorage.getItem("token")
             const res = await axios.post("http://localhost:3000/admin/createCourses",{
            name,
            description,
            price:Number(price),
            tutorName : tutor
        },{
            headers:{
                 Authorization:"Bearer " + token
            }
        })
        console.log(res.data)
        setSuccessMsg(res.data.msg)
        }
        catch(e){
            console.log(e)
        setSuccessMsg("course did not get created")

        }
       
    }
    return <div>
        <h1>Create new Course</h1>
        <input type = "text" placeholder="Name of course" onChange={(e) => {
            setName(e.target.value);
        }}></input><br></br><br></br>
        <input type = "text" placeholder="description " onChange={(e) => {
            setDescription(e.target.value);
        }}></input><br></br><br></br>
        <input type = "number" placeholder="Price " onChange={(e) => {
            setPrice(e.target.value);
        }}></input><br></br><br></br>
        <input type = "text" placeholder="Tutor Name" onChange={(e) => {
            setTutor(e.target.value);
        }}></input><br></br><br></br>
        <button onClick={AdminCreate}>Create Course</button>
        <div>{successMsg}</div>
    </div>
}