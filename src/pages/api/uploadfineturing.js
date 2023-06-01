import { useState } from "react";

export default async function Uploadjsonl(req, res) {
  const openAPIKey = process.env.OPENAI_API_KEY;
  const formData = req.body;
  // 업로드 API 요청 처리 로직

  const response = await fetch("https://api.openai.com/v1/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAPIKey}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: error.message }));
}
