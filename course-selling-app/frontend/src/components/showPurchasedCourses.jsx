import axios from "axios"
import { useEffect, useState } from "react"

export default function ShowPurchasedCourses(){
    const [successMsg,setSuccessMsg] = useState("");
    const [courses,setCourses] = useState([]);

    useEffect(() => {
       async function getPurchasedCourses() {
        try{
            const token = localStorage.getItem("token")
             const res = await axios.get("https://course-selling-backend-fiib.onrender.com/user/getPurchasedCourses",{
                 headers:{
                        Authorization:"Bearer " + token
                    }
            })
            console.log(res.data);
            setSuccessMsg("Here are the courses bought by you")
            setCourses(res.data.courses)
        }
        catch(e){
            console.log(e);
            setSuccessMsg("something wrong happened")
        }
           
       }
       getPurchasedCourses();
    },[])
    return <div>
        <h1>{successMsg}</h1>
              {courses.map((course, index) => (
      <div key={index} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
        <h3>{course.name}</h3>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Price:</strong> ₹{course.price}</p>
        <p><strong>Tutor:</strong> {course.tutorName}</p>
      </div>
    ))}
  </div>
    
}