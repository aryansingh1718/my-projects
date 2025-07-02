import { useNavigate } from "react-router-dom";
export default function UserHome(){
     const navigate = useNavigate();
    return <div>
        <button onClick={() => {
            navigate("/userShowCourses")
        }}>Show all the available courses</button><br></br><br></br>
        <button onClick={() => {
            navigate("/purchaseCourses")
        }}>purchase courses</button><br></br><br></br>
         <button onClick={() => {
            navigate("/showPurchasedCourses")
        }}>Show purchased courses</button>
    </div>
}