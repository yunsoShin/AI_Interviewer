import React from "react";
import Navbar from "@/components/navbar";
import Answer from "@/components/answer";
import Addquestion from "@/components/addquestion";
import Head from "next/head";
import Button from "@/components/ui/Button";
import { useAIProcess } from "./_app";
import { useFetchAndParse } from "@/hooks/useFetchAndParse";
function CustomQnA() {
  const { prompt, content } = useAIProcess();
  const { loading, generatedBios, setGeneratedBios, setLoading } =
    useFetchAndParse(content);

  return (
    <>
      <Head>
        <title>AI Custom Interviewer</title>
        <meta
          name="description"
          content="AI interview solution. It's made with openAI API"
        />
      </Head>
      <div className=" pointer-events-auto">
        <Navbar></Navbar>
        <div>
          <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mx-auto text-center">
            Custom AI interviewer
          </h2>
        </div>

        <main className="mx-auto flex flex-col justify-center items-center  p-5">
          <Addquestion generatedBios={generatedBios}></Addquestion>
          <Answer></Answer>
        </main>
      </div>
    </>
  );
}

export default CustomQnA;
