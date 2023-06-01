const apiKey = process.env.OPENAI_API_KEY;
async function FineTune(trainingFileId, model) {
  const response = await fetch("https://api.openai.com/v1/fine-tunes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      training_file: trainingFileId,
      model: model,
    }),
  });

  const data = await response.json();
  return data;
}
