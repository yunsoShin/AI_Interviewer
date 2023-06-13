import React from "react";
import useMyBox from "@/hooks/useMyBox";
import { useAuthContext } from "@/pages/_app";

function QuestionCard() {
  const {
    myBoxQuery: { data: Likes },
  } = useMyBox();
  const { uid } = useAuthContext();
  // Make sure Likes is not undefined and it's an array
  if (uid === null) {
    return <div>로그인을 해주세요</div>;
  } else if (!Array.isArray(Likes)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {Likes.map((like, key) => (
        <p>{like.likeText}</p>
      ))}
    </div>
  );
}

export default QuestionCard;
