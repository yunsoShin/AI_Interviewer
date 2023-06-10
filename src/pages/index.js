import React from "react";
import UploadPDF from "../components/uploadpdf";
import Navbar from "@/components/navbar";
import Answer from "@/components/answer";
function index() {
  return (
    <div className=" pointer-events-auto">
      <Navbar></Navbar>
      <div>
        <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto text-center">
          AI interviewer
        </h2>
      </div>

      <main className="max-w-5xl mx-auto flex  flex-row justify-center items-center  p-11">
        <UploadPDF></UploadPDF>
      </main>
    </div>
  );
}

export default index;
