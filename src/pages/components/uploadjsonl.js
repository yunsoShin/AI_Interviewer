import { useState } from "react";

export default function UploadJSONL() {
  const [uploadResult, setUploadResult] = useState("");

  const uploadFile = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("purpose", "fine-tune");
    formData.append("file", file);

    const response = await fetch("https://api.openai.com/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${YOUR_API_KEY}`, // Your API key here
      },
      body: formData,
    });

    const data = await response.json();
    setUploadResult(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <input type="file" id="fileInput" onChange={uploadFile} />
      <pre>{uploadResult}</pre>
    </div>
  );
}
