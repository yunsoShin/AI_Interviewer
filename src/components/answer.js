import React from "react";
import { useState } from "react";
import { useAIProcess } from "@/pages/_app";

function Answer({ generatedBios }) {
  const { prompt, setPrompt, content, setContent } = useAIProcess();
  const [answer, setAnswer] = useState();
  console.log(generatedBios);

  return (
    <>
      {
        <div className=" max-w-7xl  w-full">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black mt-5"
            placeholder={"This is conducted/progressed by chain reactions."}
          />
          <button
            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
            onClick={() => {
              setContent((prevContent) => [
                ...prevContent,
                { role: "user", content: `${answer}` },
              ]);
              setAnswer("");
            }}
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
