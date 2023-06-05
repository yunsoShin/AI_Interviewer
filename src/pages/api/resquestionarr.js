import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Invalid JSON");
    return;
  }

  const requestBody = JSON.stringify(req.body);

  const resume = requestBody.text;
  const myJob = requestBody.resultJob;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Please answer all the answers in Korean, You read the text and list 10  technical questions for the interviewer to as These questions are as detailed as possible and consist of essential questions related to job",
      },
      {
        role: "user",
        content: `Please answer all the answers in Korean , ${myJob} Please fill out 5 required interview questions for the job interview,
        ${resume}Based on this article, write 5 technical questions that the interviewer can ask in order of importance So please write 10 questions`,
      },
    ],
  });

  const result =
    response.data.choices[0].message.content || "sorry, there was a problem";

  res.status(200).json(result);
}
