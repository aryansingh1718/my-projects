import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
export default function UserShowCourses(){
    const [courses,setCourses] = useState([]);
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();

    useEffect(() => {
        async function getCourses() {
            try{
                const token = localStorage.getItem("token");
                const res = await axios.get("https://course-selling-backend-fiib.onrender.com/user/showcourses",{
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
    else{
       return (
  <div>
    <h2>Courses</h2>
    <button onClick={() => {
      navigate("/userHome")
    }}>Go back</button>
    {courses.map((course, index) => (
      <div key={index} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
        <h3>{course.name}</h3>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Price:</strong> ₹{course.price}</p>
        <p><strong>Tutor:</strong> {course.tutorName}</p>
        <button onClick={() => {
        navigate(`/purchaseCourses/${course._id}`);
        }}>buy this course</button>
      </div>
    ))}
  </div>
);
    }
}