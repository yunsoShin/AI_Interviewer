import { Configuration, OpenAIApi } from "openai";

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
    max_tokens: 1000,
    stream: true,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream, {
    headers: new Headers({
      "Cache-Control": "no-cache",
    }),
  });
}

async function OpenAIStream(payload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      const onParse = (event) => {
        if (event.type === "event") {
          const data = event.data;
          controller.enqueue(encoder.encode(data));
        }
      };

      if (res.status !== 200) {
        const data = {
          status: res.status,
          statusText: res.statusText,
          body: await res.text(),
        };
        console.log(
          `Error: received non-200 status code, ${JSON.stringify(data)}`
        );
        controller.close();
        return;
      }

      const parser = createParser(onParse);
      for await (const chunk of res.body) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  let counter = 0;
  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      const data = decoder.decode(chunk);
      if (data === "[DONE]") {
        controller.terminate();
        return;
      }
      try {
        const json = JSON.parse(data);
        const text = json.choices[0].delta?.content || "";

        const payload = { text: text };
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
        );
        counter++;
      } catch (e) {
        controller.error(e);
      }
    },
  });

  return readableStream.pipeThrough(transformStream);
}
