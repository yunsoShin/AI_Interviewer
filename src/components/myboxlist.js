import React from "react";
import useMyBox from "@/hooks/useMyBox";
import { useAuthContext } from "@/pages/_app";
import { Toaster, toast } from "react-hot-toast";
import { useAIProcess } from "@/pages/_app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState } from "react";
import Answer from "./answer";

function QuestionCard() {
  const router = useRouter();
  const {
    myBoxQuery: { data: Likes },
  } = useMyBox();
  const { uid } = useAuthContext();
  const { resultConvert, resultJob, setPrompt, content, setContent } =
    useAIProcess();
  const [selectedKey, setSelectedKey] = useState(null);
  const [selectedText, setSelectedText] = useState("");
  // Make sure Likes is not undefined and it's an array
  if (uid === null) {
    return <div>로그인을 해주세요</div>;
  } else if (!Array.isArray(Likes)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="mx-auto overflow-y-scroll h-[750px] mr-0">
          <div className="gap-8 flex flex-col items-center justify-center">
            {Likes.map((like, key) => (
              <div
                className={`bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-pointer border w-3/4 text-center ${
                  selectedKey !== null && selectedKey !== key
                    ? "not-selected"
                    : ""
                }`}
                key={key}
                onClick={async () => {
                  if (selectedKey === null) {
                    toast("면접을 시작하겠습니다", {
                      icon: <FontAwesomeIcon icon={faMicrochip} />,
                    });
                    setSelectedKey(key);
                    setSelectedText(like.likeText);
                    setContent("");
                    setPrompt(like.likeText);
                    setTimeout(() => {
                      router.push("/customQnA");
                    }, 800);
                  }
                }}
              >
                <p>{like.likeText}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    </div>
  );
}

export default QuestionCard;
