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

export const getJob = async (text) => {
  try {
    const res = await fetch("/api/getJob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    // HTTP 상태 코드가 200-299 범위에 있는지 확인하여 응답의 성공 여부를 검사합니다.
    if (!res.ok) {
      // 서버가 클라이언트 에러(400-499)나 서버 에러(500-599)를 응답한 경우,
      // 에러 객체를 생성하고 추가 정보와 함께 던집니다.
      const errorData = await res.json(); // 에러에 대한 추가 정보를 포함할 수도 있습니다.
      throw new Error(`Server responded with ${res.status}: ${errorData.message}`);
    }

    // 응답이 성공적이라면, JSON을 파싱하여 반환합니다.
    return await res.json();
  } catch (error) {
    // 네트워크 에러 또는 throw된 에러를 처리합니다.
    console.error("Error fetching job data:", error.message);
    // 에러 상황을 처리할 수 있는 객체나 메시지를 반환합니다.
    // 이는 호출한 컴포넌트에서 적절한 사용자 피드백을 제공하는 데 사용할 수 있습니다.
    return { error: true, message: error.message , requestBody:text };
  }
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
