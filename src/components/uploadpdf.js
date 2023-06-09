import { useState, useRef } from "react";
import CardSwiper from "./cardswiper";
import { convertPdf, getJob, getQuestionArr } from "../utils/fetchapis";
import { Toaster, toast } from "react-hot-toast";
import Addquestion from "./addquestion";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
// 분리된 비동기 함수들

export default function UploadPDF() {
  const [selectedFile, setSelectedFile] = useState();
  const [resultConvert, setResultConvert] = useState();
  const [resultJob, setResultJob] = useState();
  const submit = async (e) => {
    e.preventDefault();

    const resultConvert = await convertPdf(selectedFile);
    setResultConvert(resultConvert);
    const resultJob = await getJob(resultConvert);
    setResultJob(resultJob);
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
