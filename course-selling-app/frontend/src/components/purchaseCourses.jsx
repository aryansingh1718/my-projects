import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PurchaseCourses() {
  const navigate = useNavigate();
  const { id } = useParams(); //  id needs to be inside {} so that it can be destructured properly
  const token = localStorage.getItem("token");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function buyCourses() {
      try {
        const res = await axios.post(
          "https://course-selling-backend-fiib.onrender.com/user/purchaseCourses",
          { id },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(res.data);
        setSuccessMsg(res.data.msg);
      } catch (e) {
        console.log(e);
        setSuccessMsg("Could not purchase course");
      }
    }

    buyCourses(); 
  }, [id]);

  return (
    <div>
      <p>{successMsg}</p>
      <button
        onClick={() => {
          navigate("/showPurchasedCourses");
        }}
      >
        View the purchased courses
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          navigate("/userShowCourses");
        }}
      >
        Go back
      </button>
    </div>
  );
}
