import React from "react";
import { useState } from "react";

function SetAPI(props) {
  const [apiKey, setApiKey] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setApiKey(value);
  };

  const handleSetApiKey = () => {
    // apiKey를 사용하여 원하는 작업을 수행하세요.
    console.log(apiKey);
  };

  return (
    <div className="card">
      <label htmlFor="apiKeyInput">API Key:</label>
      <input
        type="password"
        id="apiKeyInput"
        value={apiKey}
        onChange={handleInputChange}
      />
      <button onClick={handleSetApiKey}>Set API Key</button>
    </div>
  );
}

export default SetAPI;
