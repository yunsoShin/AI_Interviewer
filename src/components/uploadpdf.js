import { useState } from "react";

import { convertPdf, getJob } from "../utils/fetchapis";
import Addquestion from "./addquestion";
import { uploadResume } from "../pages/api/firebase";
import { useAuthContext } from "@/pages/_app";

export default function UploadPDF() {
  const { user } = useAuthContext();
  const [selectedFile, setSelectedFile] = useState();
  const [resultConvert, setResultConvert] = useState();
  const [resultJob, setResultJob] = useState();
  const submit = async (e) => {
    e.preventDefault();
    const resultConvert = await convertPdf(selectedFile);
    setResultConvert(resultConvert);
    const resultJob = await getJob(resultConvert);
    setResultJob(resultJob);
    const resume = resultConvert.toString();
    await uploadResume(resume, user.uid);
    console.log(user.uid, resume);
  };
  return (
    <div>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={submit}>Upload</button>
      <Addquestion
        resultConvert={resultConvert}
        resultJob={resultJob}
      ></Addquestion>
    </div>
  );
}
