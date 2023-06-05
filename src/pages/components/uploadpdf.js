import { useState } from "react";
import CardSwiper from "./cardswiper";

export default function UploadPDF() {
  const [selectedFile, setSelectedFile] = useState();

  const submit = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const resConvert = await fetch("/api/convert", {
      method: "POST",
      body: formData,
    });

    const resultConvert = await resConvert.text();

    const job = await fetch("/api/getJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: resultConvert }),
    });
    const resultJob = await job.json();

    const resGPT = await fetch("/api/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: resultConvert, resultJob: resultJob }),
    });

    const resultGPT = await resGPT.json();
    const content = resultGPT.content;
    const splitContent = content.split(/\n[0-9]+\.\s/);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={submit}>Upload</button>
      <CardSwiper data={splitContent} />
    </div>
  );
}
