import React from "react";
import UploadPDF from "../components/uploadpdf";
import Navbar from "@/components/navbar";
import Addquestion from "@/components/addquestion";
import Head from "next/head";
import { useAIProcess } from "./_app";
import { useFetchAndParse } from "@/hooks/useFetchAndParse";

function Home() {
  const { resultConvert, resultJob, content, setContent } = useAIProcess();
  const { loading, generatedBios, setGeneratedBios, setLoading } =
    useFetchAndParse(content);
  return (
    <>
      <Head>
        <title>AI Interviewer</title>
        <meta
          name="description"
          content="AI interview solution. It's made with openAI API"
        />
      </Head>
      <div className=" pointer-events-auto">
        <Navbar></Navbar>
        <div>
          <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mx-auto text-center">
            AI interviewer
          </h2>
        </div>

        <main className="mx-auto flex flex-col justify-center items-center  p-5">
          <UploadPDF></UploadPDF>
          <Addquestion generatedBios={generatedBios}></Addquestion>

          {content && !loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full scale-x-75 md:scale-100"
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
          {content && loading && (
            <button className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full scale-x-75 md:scale-100">
              로딩중
            </button>
          )}
        </main>
      </div>
    </>
  );
}

export default Home;

{
  /* {content && !loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full  scale-x-75 md:scale-100"
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
          {content && loading && (
            <button className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full  scale-x-75 md:scale-100">
              loading
            </button>
          )} */
}
