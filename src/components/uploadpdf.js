import { useState } from "react";
import CardSwiper from "./cardswiper";
import { convertPdf, getJob, getQuestionArr } from "../utils/fetchapis";

// 분리된 비동기 함수들

export default function UploadPDF() {
  const [selectedFile, setSelectedFile] = useState();
  const [splitContent, setSplitContent] = useState();

  const submit = async () => {
    try {
      const resultConvert = await convertPdf(selectedFile);
      const resultJob = await getJob(resultConvert);
      const resultGPT = await getQuestionArr(resultConvert, resultJob);

      const content = resultGPT.content;

      const splitData = content
        .split(/(^|\n)[0-9]+\.\s/)
        .filter((item) => item !== "\n" && item);

      setSplitContent(splitData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={submit}>Upload</button>
      <CardSwiper data={splitContent} />
    </div>
  );
}
