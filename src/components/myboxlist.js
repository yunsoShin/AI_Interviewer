import React from "react";
import useMyBox from "@/hooks/useMyBox";
import { useAuthContext } from "@/pages/_app";
import { Toaster, toast } from "react-hot-toast";
import { useAIProcess } from "@/pages/_app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
function QuestionCard() {
  const router = useRouter();
  const {
    myBoxQuery: { data: Likes },
  } = useMyBox();
  const { uid } = useAuthContext();
  const { resultConvert, resultJob, prompt, content, setContent } =
    useAIProcess();
  // Make sure Likes is not undefined and it's an array
  if (uid === null) {
    return <div>로그인을 해주세요</div>;
  } else if (!Array.isArray(Likes)) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" w-full">
      <>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <div className=" space-y-10 my-10">
          <div
            className="space-y-8 flex flex-col items-center justify-center max-w-5xl mx-auto"
            onClick={async () => {
              toast("파생될 질문을 생성합니다", {
                icon: <FontAwesomeIcon icon={faMicrochip} />,
              });
              router.push("/");
            }}
          >
            {Likes.map((like, key) => (
              <div
                className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition  cursor-pointer border"
                key={key}
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
