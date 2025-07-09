import { useNavigate } from "react-router-dom"

export default function AdminHome(){
    const navigate = useNavigate();
    return <div>
        <button onClick={() => {
            navigate("/createCourse")
        }}>Create Course</button><br></br><br></br>
        <button onClick={() => {
            navigate("/adminShowCourses")
        }}>Show all the courses</button>
    </div>
}