import React from "react";
import { useState } from "react";
import { useAIProcess } from "@/pages/_app";

function Answer({ generatedBios }) {
  const { prompt, setPrompt, content, setContent, resultConvert, resultJob } =
    useAIProcess();
  const [answer, setAnswer] = useState();
  const [answerArr, setAnswerArr] = useState([]);
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
            placeholder={"  This is conducted/progressed by chain reactions."}
          />
          <button
            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
            onClick={() => {
              if (content.length <= 3) {
                setContent((prevContent) => [
                  ...prevContent,
                  { role: "assistant", content: `${generatedBios}` },
                  {
                    role: "user",
                    content: `Please answer in Korean. All questions should be questions except the answers mentioned earlier. However, detailed questions derived from the question are allowed only one
                  answer:"${answer}" /n ""The text between "and" is your content to the previous question
                  "${answer}" Please write 2 interview question that will follow this answer The two questions are divided into "/1./" and "/2./"
                  `,
                  },
                ]);
              } else if (content.length > 3) {
                setContent((prevContent) =>
                  prevContent
                    .filter((item) => item.role === "system") // role이 "system"인 요소만 필터링
                    .concat([
                      {
                        role: "user",
                        content: `Please answer all the answers in Korean, write 1 interview question for the ${resultJob} job interview,
                        ${resultConvert} Based on this article, please write technical questions that the interviewer can ask and write a total of 2 questions
                        questions should be questions except ${answerArr}. The two questions are divided into "/1./" and "/2./
                      `,
                      },
                    ])
                );
              }

              setAnswerArr((prevArr) => [...prevArr, answer]);
              setAnswer("");
              console.log(answer);
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
