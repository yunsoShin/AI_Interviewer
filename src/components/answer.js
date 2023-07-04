import React, { useState } from "react";
import { useAIProcess } from "@/pages/_app";

function Answer() {
  const { prompt, setContent, resultJob } = useAIProcess();
  const [answer, setAnswer] = useState("");
  let recognition = null;

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.lang = "ko-KR";
      recognition.interimResults = true;
      recognition.continuous = true;

      let finalTranscript = "";

      recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        setAnswer(finalTranscript + interimTranscript);
      };

      recognition.start();
    } else {
      console.log("Browser does not support Speech recognition");
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      recognition = null;
    }
  };

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
          <button onClick={startListening}>Start Voice Input</button>
          <button onClick={stopListening}>Stop Voice Input</button>
          <button
            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
            onClick={(e) => {
              e.preventDefault();
              setContent(() => [
                {
                  role: "system",
                  content: `${resultJob}에 지원한 면접자가 ${prompt}에 대한 답변으로 ${answer}이란 답변을 하였어 이 뒤에 이어질 추가질문을 1개만 생성해줍니다
                  질문을 생성할때, 질문 맨앞에 "1." 에서 ""사이에있는 1.을 붙여야합니다
          `,
                },
                {
                  role: "user",
                  content: `${resultJob}에 지원한 면접자가 ${prompt}에 대한 답변으로 ${answer}이란 답변을 하였어 이 뒤에 이어질 추가질문을 1개만 생성해줘
          `,
                },
              ]);
              setAnswer("");
              stopListening();
            }}
          >
            답변하기 &rarr;
          </button>
        </div>
      }
    </>
  );
}

export default Answer; //This is c
