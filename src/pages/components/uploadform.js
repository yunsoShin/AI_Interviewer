import { useState } from "react";

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState();

  const submit = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("/api/convert", {
      method: "POST",
      body: formData,
    });

    const result = await res.text();
    console.log(result);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={submit}>Upload</button>
    </div>
  );
}
