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

  const prompt = body.prompt;

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Please answer all the answers in Korean, You read the text and Generate list 2 clearly labeled "1." and "2." technical questions for the interviewer to as These questions are as detailed as possible and consist of essential questions related to job`,
      },
      {
        role: "user",
        content: `${prompt}`,
      },
    ],
    max_tokens: 300,
    stream: true,
  };
  const stream = await OpenAIStream(payload);

  return new Response(stream, {
    headers: new Headers({
      "Cache-Control": "no-cache",
    }),
  });
}
