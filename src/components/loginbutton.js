import React from "react";
import { login } from "@/pages/api/firebase";
function LoginButton(props) {
  return (
    <div>
      <button onClick={login}>로그인하기</button>
    </div>
  );
}

export default LoginButton;
