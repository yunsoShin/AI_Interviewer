import React from "react";
import { useState, useRef, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useAuthContext } from "@/pages/_app";
import { setLikes } from "@/pages/api/firebase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPrompt, setContent } from "../data/aiProcessSlice";

function Addquestion({ generatedBios }) {
  const [isPlaying, setIsPlaying] = useState(false); // 오디오 재생 중인지 상태 추가

  const handlePlayAudio = async (input) => {
    if (isPlaying) {
      return; // 오디오가 이미 재생 중이라면 함수 종료
    }
    setIsPlaying(true); // 오디오 재생 시작

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/audio/speech",
        {
          model: "tts-1",
          input: input,
          voice: "alloy",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`, // 서버에서 이 값을 동적으로 주입받는 방식을 권장
            "Content-Type": "application/json",
          },
          responseType: "blob", // 응답을 blob으로 받기 위함
        }
      );

      const blob = response.data;
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.play();

      audio.onended = () => {
        setIsPlaying(false); // 오디오 재생이 끝나면 상태 업데이트
      };
    } catch (error) {
      console.error("Error playing audio:", error.response.data);
      toast.error("오디오 재생에 실패했습니다.");
      setIsPlaying(false); // 오류 발생 시 상태 업데이트
    }
  };

  const scrollRef = useRef(null);
  // const { resultConvert, resultJob, content, setContent, prompt } =
  //   useAIProcess();

  const dispatch = useDispatch();
  const { resultConvert, resultJob, prompt, content } = useSelector(
    (state) => state.aiProcess
  );

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
                      try {
                        navigator.clipboard.writeText(generatedBio);
                        if (uid) {
                          toast("클립보드와 MyBox에 저장하였습니다", {
                            icon: "✂️",
                          });
                          setLikes(generatedBio, uid);
                        } else {
                          toast("클립보드에 저장하였습니다", {
                            icon: "✂️",
                          });
                        }
                        await handlePlayAudio(generatedBio);
                      } catch (error) {
                        console.error("Error handling click:", error);
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
