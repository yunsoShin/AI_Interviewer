import { Configuration, OpenAIApi } from "openai";
import { OpenAIStream } from "../../utils/fetchapis";

export const config = {
  runtime: "edge",
};

export default async function handler(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Invalid JSON");
    return;
  }
  const body = await req.json();
  const resume = body.resultConvert;
  const myJob = body.resultJob;

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Please answer all the answers in Korean, You read the text and Generate list 2 clearly labeled "1." and "2." technical questions for the interviewer to as These questions are as detailed as possible and consist of essential questions related to job`,
      },
      {
        role: "user",
        content: `Please answer all the answers in Korean , ${myJob} Please fill out 1 required interview questions for the job interview,
        ${resume}Based on this article, write 1 technical questions that the interviewer can ask in order of importance So please write 2 questions`,
      },
    ],
    max_tokens: 50,
    stream: true,
  };
  const stream = await OpenAIStream(payload);

  return new Response(stream, {
    headers: new Headers({
      "Cache-Control": "no-cache",
    }),
  });
}
