import React from "react";
import { useState } from "react";
import { useUploadProcess } from "@/pages/_app";

function Answer() {
  const { prompt, setPrompt } = useUploadProcess();
  const [answer, setAnswer] = useState();

  return (
    <>
      {
        <div className=" max-w-7xl  w-full">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"This is conducted/progressed by chain reactions."}
          />
          <button
            className="bg-black rounded-xl text-white font-medium px-4 sm:mt-10 mt-2 hover:bg-black/80 w-full"
            onClick={(e) => setPrompt(`${answer}`)}
          >
            답변하기 &rarr;
          </button>
        </div>
      }
    </>
  );
}

export default Answer;

//This is conducted/progressed by chain reactions.
