import { createParser } from "eventsource-parser";
 
export const convertResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log(file.type);
  let res; 
  switch (file.type) {
    case "application/pdf":
      res = await fetch("/api/converts/convertpdf", {
        method: "POST",
        body: formData,
      });
      break;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      res = await fetch("/api/converts/convertexel", {
        method: "POST",
        body: formData,
      });
      break;
    case "application/vnd.ms-excel":
      res = await fetch("/api/converts/convertexel", {
        method: "POST",
        body: formData,
      });
      break;
  }

  return res.text();
};



export async function OpenAIStream(payload) {
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




 export async function handlePlayAudio(payload){
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // 서버에서 이 값을 동적으로 주입받는 방식을 권장
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      payload })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
 };
  
 
