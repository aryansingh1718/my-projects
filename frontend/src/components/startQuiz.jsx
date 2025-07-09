import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countMarks } from "../recoil/marks";
import { useRecoilState } from 'recoil';


export default function StartQuiz() {
  const [question, setQuestion] = useState(null);    
  const [index, setIndex] = useState(1);    //index of question(1-based)
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});    //creates the object having question number as key and marked option number as value
  const[marks,setMarks] = useRecoilState(countMarks)
  const [successMsg,setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const qId = index - 1;

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/question/${index}`);
        setQuestion(res.data.question);
        const prevAns = answers[qId]
        setSelectedOption(prevAns ?? null);  //in case we move to any previous question, we have to check if we have already selected an option for it.if yes, then we have to store it in selectedOption state.
      } catch (err) {
        console.error("Error fetching question:", err);
      }
    };
    fetchQuestion();
  }, [index]);

  const handleOptionClick = async (idx) => {
  const prevAns = answers[qId];
  let change = 0;

  if (prevAns !== undefined) {
    const resPrev = await axios.post(`http://localhost:3000/result/${qId}/${prevAns}`, { username });
    if (resPrev.data.correct) change -= 10;
  }

  const res = await axios.post(`http://localhost:3000/result/${qId}/${idx}`, { username });
  if (res.data.correct) {
    change += 10;
    setSuccessMsg("Correct")
  }else{
    setSuccessMsg("Incorrect")
  }
  
  setMarks(m => m + change);
  setAnswers(a => ({ ...a, [qId]: idx }));
  setSelectedOption(idx);
};

  const handleNav = (step) => {
    setSuccessMsg("")
    setIndex(i => i + step); //Function to handle the recent state of index
  }

  return (
    <div className="h-screen w-full bg-gray-600 text-white p-4">
      <h1 className="text-4xl mb-4">Quiz Application</h1>

      {question ? (
        <>
          <h2 className="text-xl mb-2">{question.question}</h2>
          <div className="space-y-2 mt-4">
            {question.options.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedOption === idx}
                  onChange={() => handleOptionClick(idx)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-full focus:ring-blue-500 cursor-pointer"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </>
      ) : <p>Loading...</p>}

      <div className="flex mt-6 gap-10 justify-center">
        {index > 1 && (
          <button className="border-2 px-4 py-2 text-white rounded" onClick={() => handleNav(-1)}>
            Previous
          </button>
        )}
        {index < 5 ? (
          <button className="border-2 px-4 py-2 text-white rounded" onClick={() => handleNav(1)}>
            Next
          </button>
        ) : (
          <button className="border-2 px-4 py-2 text-white rounded" onClick={() => navigate("/showResult")}>
            Submit
          </button>
        )}
      </div>
      <div>{successMsg}</div>
    </div>
  );
}
