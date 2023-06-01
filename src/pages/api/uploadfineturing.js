import { useState } from "react";

export default async function Uploadjsonl(req, res) {
  const file = req.body.file;
  const openAPIKey = process.env.OPENAI_API_KEY;
  const formData = new FormData();
  formData.append("purpose", "fine-tune");
  formData.append("file", file);

  // 업로드 API 요청 처리 로직
  const response = await fetch("https://api.openai.com/v1/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAPIKey}`,
    },
    body: formData,
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
