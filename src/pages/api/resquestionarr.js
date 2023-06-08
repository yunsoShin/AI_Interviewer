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

  const resume = req.body.resultConvert;
  const myJob = req.body.resultJob;
  const payload = {
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
    stream: true,
  };
  const stream = await OpenAIStream(payload);
  console.log(stream);
  return new Response(stream, {
    headers: new Headers({
      // since we don't use browser's EventSource interface, specifying content-type is optional.
      // the eventsource-parser library can handle the stream response as SSE, as long as the data format complies with SSE:
      // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server

      // 'Content-Type': 'text/event-stream',
      "Cache-Control": "no-cache",
    }),
  });
}
