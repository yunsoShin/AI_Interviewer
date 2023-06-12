// 필요한 모듈을 불러옵니다.
import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../pages/api/firebase";
import "../styles/globals.css";

const AIProcessContext = createContext();

export const AIProcessProvider = ({ children }) => {
  const [resultConvert, setResultConvert] = useState();
  const [resultJob, setResultJob] = useState();
  const [prompt, setPrompt] = useState();
  const [content, setContent] = useState();

  return (
    <AIProcessContext.Provider
      value={{
        resultConvert,
        setResultConvert,
        resultJob,
        setResultJob,
        prompt,
        setPrompt,
        content,
        setContent,
      }}
    >
      {children}
    </AIProcessContext.Provider>
  );
};

export function useAIProcess() {
  return useContext(AIProcessContext);
}

// createContext를 사용하여 새로운 Context를 생성합니다. 이 Context는 전역 상태를 공유하기 위해 사용됩니다.
const AuthContext = createContext();

// AuthContextProvider 컴포넌트를 정의합니다. 이 컴포넌트는 children props를 받아서 AuthContext.Provider 컴포넌트를 반환합니다.
// 이 컴포넌트를 통해 value로 전달한 값들을 하위 컴포넌트들이 사용할 수 있게 됩니다.
export function AuthContextProvider({ children }) {
  // useState 훅을 사용하여 user 상태를 관리합니다.
  const [user, setUser] = useState();

  // useEffect 훅을 사용하여 컴포넌트가 마운트 될 때 실행되는 코드를 작성합니다.
  // 여기서는 onUserStateChange 함수를 호출하여 user 상태가 변경되었을 때 setUser 함수를 통해 user 상태를 업데이트합니다.
  useEffect(() => {
    onUserStateChange((user) => setUser(user));
  }, []);

  // AuthContext.Provider 컴포넌트를 반환하고, value 속성을 통해 user 상태와 login, logout 함수를 전달합니다.
  // 이렇게 함으로써 하위 컴포넌트에서는 useAuthContext 훅을 통해 이 값들을 사용할 수 있게 됩니다.
  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// useAuthContext라는 커스텀 훅을 정의합니다. 이 훅은 useContext 훅을 사용하여 AuthContext의 값을 가져옵니다.
// 이 훅을 사용하면 컴포넌트 내에서 AuthContext의 값을 쉽게 사용할 수 있게 됩니다.
export function useAuthContext() {
  return useContext(AuthContext);
}

// _app.js 파일에서 AuthContextProvider 컴포넌트를 최상위에 위치시킵니다.
// 이렇게 하면 이 앱의 모든 컴포넌트에서 AuthContext의 값을 사용할 수 있게 됩니다.
export default function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <AIProcessProvider>
        <Component {...pageProps} />
      </AIProcessProvider>
    </AuthContextProvider>
  );
}
