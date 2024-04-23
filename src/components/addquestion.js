import React from "react";
import { useState, useRef, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useAuthContext, useAIProcess } from "@/pages/_app";
import { setLikes } from "@/pages/api/firebase";
import { handlePlayAudio } from "@/utils/fetchapis";

function Addquestion({ generatedBios }) {

    const handlePlayAudio = async (input) => {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`, // 서버에서 이 값을 동적으로 주입받는 방식을 권장
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "tts-1",
        input: input,
        voice: "alloy"
      })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
    };
  
  const scrollRef = useRef(null);
  const { resultConvert, resultJob, content, setContent, prompt } =
    useAIProcess();
  const { uid } = useAuthContext();
  const [bio, setBio] = useState("");
  const bioRef = useRef(null);
  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (scrollRef.current !== null) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [generatedBios]);
  return (
    <div className="w-full">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <div className="">
        <>
          <hr className="bg-gray-700 border-1 dark:bg-gray-700" />
          <div
            className="space-y-8 flex flex-col items-center justify-center overflow-y-scroll h-[550px]  mr-10 md:translate-x-12 md:text-lg text-xs  translate-x-7"
            ref={scrollRef}
          >
            {prompt && (
              <p className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition border md:mr-10 mr-7">
                {prompt}
              </p>
            )}
            {generatedBios
              .replaceAll("/", "")
              .trim()
              .split(/\d\./)
              .filter((generatedBio) => generatedBio.trim() !== "")
              .map((generatedBio, index) => {
                return (
                  <div
                    className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border md:mr-10 mr-7"
                    onClick={async () => {
                        handlePlayAudio(generatedBio)
                      navigator.clipboard.writeText(generatedBio);
                      {
                        uid &&
                          toast("클립보드와 MyBox에 저장하였습니다", {
                            icon: "✂️",
                          });
                        setLikes(generatedBio, uid);
                      }
                      {
                        !uid &&
                          toast("클립보드에 저장하였습니다", {
                            icon: "✂️",
                          });
                      }
                    }}
                    key={index}
                  >
                    <p>{generatedBio}</p>
                  </div>
                );
              })}
          </div>
        </>
      </div>
    </div>
  );
}

export default Addquestion;
