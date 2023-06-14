import React from "react";
import { useState, useRef, useEffect } from "react";
import { convertPdf, getJob, getQuestionArr } from "../utils/fetchapis";
import { Toaster, toast } from "react-hot-toast";
import Answer from "./answer";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { useAuthContext, useAIProcess } from "@/pages/_app";
import { setLikes } from "@/pages/api/firebase";

function Addquestion() {
  const { resultConvert, resultJob, prompt, content, setContent } =
    useAIProcess();
  const { uid } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [generatedBios, setGeneratedBios] = useState("");
  const bioRef = useRef(null);
  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if ((resultConvert, resultJob, content)) {
      setGeneratedBios("");

      const fetchData = async () => {
        setLoading(true);
        const response = await fetch("/api/chatgpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
          }),
        });

        const data = response.body;

        if (!data) {
          return;
        }

        const onParse = (event) => {
          if (event.type === "event") {
            const data = event.data;
            try {
              const text = JSON.parse(data).text ?? "";
              setGeneratedBios((prev) => prev + text);
            } catch (e) {
              console.error(e);
            }
          }
        };
        const reader = data.getReader();
        const decoder = new TextDecoder();
        const parser = createParser(onParse);
        let done = false;
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value, { stream: true });
          parser.feed(chunkValue);
        }
        scrollToBios();
        setLoading(false);
      };

      fetchData();
    }
  }, [resultConvert, resultJob, content]);

  return (
    <div className=" w-full">
      <>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />

        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
              <div className="space-y-8 flex flex-col items-center justify-center max-w-5xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split(/\d\./)
                  .map((generatedBio, index) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={async () => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("클립보드와 MyBox에 저장하였습니다", {
                            icon: "✂️",
                          });
                          setLikes(generatedBio, uid);
                        }}
                        key={index}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
          {content && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={() =>
                setContent((prevContent) => [
                  ...prevContent,
                  { role: "assistant", content: `${generatedBios}` },
                  {
                    role: "user",
                    content: `이전에 했던질문 이외의 새로운 질문을 다시 생성해줘
              `,
                  },
                ])
              }
            >
              새 질문 생성하기
            </button>
          )}
        </div>
      </>
    </div>
  );
}

export default Addquestion;
