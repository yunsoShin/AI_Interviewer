import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export const convertPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/convertpdf", {
    method: "POST",
    body: formData,
  });
  return res.text();
};

export const getJob = async (text) => {
  const res = await fetch("/api/getJob", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return res.json();
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

// 필요한 TextEncoder와 TextDecoder 인스턴스를 생성합니다.
const encoder = new TextEncoder();
const decoder = new TextDecoder();

// OpenAI API를 호출하여 대화 completions를 얻습니다.
const res = await fetch("https://api.openai.com/v1/chat/completions", {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  method: "POST",
  body: JSON.stringify(payload),
});

// OpenAI API로부터 수신된 데이터를 처리하는 ReadableStream 인스턴스를 생성합니다.
const readableStream = new ReadableStream({
  async start(controller) {
    // 데이터 파싱 이벤트가 발생할 때마다 실행되는 함수를 정의합니다.
    const onParse = (event) => {
      if (event.type === "event") {
        const data = event.data;
        // 이벤트 데이터를 인코딩하고 스트림에 추가합니다.
        controller.enqueue(encoder.encode(data));
      }
    };

    // OpenAI API로부터의 응답 상태 코드가 200이 아니라면 에러 메시지를 출력하고 스트림을 닫습니다.
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

    // 응답 본문을 청크 단위로 읽어들이며, 각 청크를 디코딩하고 파서에 제공합니다.
    const parser = createParser(onParse);
    for await (const chunk of res.body) {
      parser.feed(decoder.decode(chunk));
    }
  },
});

// counter를 설정합니다. 이 값은 특정 조건에 따라 변환을 건너뛰기 위해 사용됩니다.
let counter = 0;

// ReadableStream에서 데이터를 받아 변환하는 TransformStream 인스턴스를 생성합니다.
const transformStream = new TransformStream({
  async transform(chunk, controller) {
    // 청크를 디코딩합니다.
    const data = decoder.decode(chunk);
    // 디코딩된 데이터가 "[DONE]" 문자열인지 확인합니다.
    // "[DONE]" 문자열이라면 스트림을 종료합니다.
    if (data === "[DONE]") {
      controller.terminate();
      return;
    }
    try {
      // 데이터를 JSON으로 파싱합니다.
      const json = JSON.parse(data);
      // 응답 중에서 첫 번째 선택지의 `delta` 객체의 `content` 프로퍼티를 가져옵니다.
      const text = json.choices[0].delta?.content || "";
      // 텍스트가 2개의 줄바꿈('\n')을 포함하거나 counter가 2 미만이라면 데이터는 건너뜁니다.
      if (counter < 2 && (text.match(/\n/) || []).length) {
        return;
      }
      // 파싱한 텍스트를 JSON 객체로 인코딩하고, "data: "를 앞에 붙여 SSE(Server-Sent Events) 포맷에 맞게 만듭니다.
      const payload = { text: text };
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
      );
      counter++;
    } catch (e) {
      // 파싱 과정에서 에러가 발생하면 스트림의 error 메소드를 호출하여 에러를 전달합니다.
      controller.error(e);
    }
  },
});

// ReadableStream를 TransformStream을 통해 파이프하고 결과를 반환합니다.
return readableStream.pipeThrough(transformStream);
