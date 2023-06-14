import React from "react";
import UploadPDF from "../components/uploadpdf";
import Navbar from "@/components/navbar";
import Answer from "@/components/answer";
import Addquestion from "@/components/addquestion";
function Home() {
  return (
    <div className=" pointer-events-auto">
      <Navbar></Navbar>
      <div>
        <h2 className="sm:text-4xl text-2xl font-bold text-slate-900 mx-auto text-center">
          AI interviewer
        </h2>
      </div>

      <main className="mx-auto flex flex-col justify-center items-center  p-5">
        <UploadPDF></UploadPDF>
        <Addquestion></Addquestion>
      </main>
    </div>
  );
}

export default Home;
