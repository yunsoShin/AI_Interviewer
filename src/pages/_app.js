import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../pages/api/firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const AuthContext = createContext();

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

export function useAuthContext() {
  return useContext(AuthContext);
}

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AIProcessProvider>
          <Component {...pageProps} />
        </AIProcessProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
