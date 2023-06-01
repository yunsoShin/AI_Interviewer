import { useState } from "react";

const UploadJSONL = () => {
  const [apiKey, setApiKey] = useState("");
  const [uploadResult, setUploadResult] = useState("");

  const setApiKeyHandler = () => {
    const apiKeyInput = document.getElementById("apiKeyInput");
    setApiKey(apiKeyInput.value);
  };

  const uploadFileHandler = async () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("purpose", "fine-tune");
    formData.append("file", file);

    const response = await fetch("https://api.openai.com/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    const data = await response.json();
    setUploadResult(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <h1>File Upload and Fine-tuning using OpenAI API</h1>
      <div className="main-container">
        <div className="left-container">
          <div className="card">
            <label htmlFor="apiKeyInput">API Key:</label>
            <input type="password" id="apiKeyInput" />
            <button onClick={setApiKeyHandler}>Set API Key</button>
          </div>
          <div className="card">
            <h2>Step 1: Upload File</h2>
            <input type="file" id="fileInput" />
            <button onClick={uploadFileHandler}>Upload File</button>
            <pre id="uploadResult">{uploadResult}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadJSONL;
