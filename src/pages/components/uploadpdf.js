import { useState } from "react";

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
    const resGPT = await fetch("/api/chatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: resultConvert }),
    });

    const resultGPT = await resGPT.json();

    console.log(resultGPT);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={submit}>Upload</button>
    </div>
  );
}
