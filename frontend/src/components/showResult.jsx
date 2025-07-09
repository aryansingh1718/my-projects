import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { countMarks } from "../recoil/marks";

export default function ShowResult() {
  const marks = useRecoilValue(countMarks);

 
  return (
    <div className="h-screen w-full bg-gray-600 text-white p-4">
      {marks > 20 ? (
        <div>
          <h1>You got {marks} marks</h1>
          <h1 className="text-4xl">CONGRATULATIONS</h1>
        </div>
      ) : (
        <div>
          <h1>You got {marks} marks</h1>
          <h1 className="text-4xl">TRY HARDER NEXT TIME</h1>
        </div>
      )}
    </div>
  );
}
