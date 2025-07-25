import axios from "axios"
import { useEffect, useState } from "react"
export default function AdminShowCourses(){
    const [courses,setCourses] = useState([]);
      const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function getCourses() {
            try{
                const token = localStorage.getItem("token");
                const res = await axios.get("https://course-selling-backend-fiib.onrender.com/admin/showcourses",{
                    headers:{
                        Authorization:"Bearer " + token
                    }
                })
                setCourses(res.data.courses);
                setLoading(false);
            }
            catch(e){
        console.error("Error fetching courses:", e);
        setLoading(false);
             }
        }
        getCourses();
    },[])
       
    if(loading){
        return <div>
            Loading Courses
        </div>
    }
    else if(courses.length == 0){
      return <h1>No courses are available</h1>
    }
    else{
       return (
  <div>
    <h2>Courses</h2>
    {courses.map((course, index) => (
      <div key={index} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
        <h3>{course.name}</h3>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Price:</strong> ₹{course.price}</p>
        <p><strong>Tutor:</strong> {course.tutorName}</p>
      </div>
    ))}
  </div>
);
    }
}