import { Configuration, OpenAIApi } from "openai";
import { handlePlayAudio } from "../../utils/fetchapis";

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
     model: "tts-1",
        input: {content},
        voice: "alloy"
  };

  const stream = await handlePlayAudio(payload);

  return stream
}
