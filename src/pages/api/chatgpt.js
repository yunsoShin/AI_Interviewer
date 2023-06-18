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

  const content = body.content;

  const payload = {
    model: "gpt-3.5-turbo",
    messages: content,
    temperature: 0.65,
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
