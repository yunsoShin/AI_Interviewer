import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

export default async function handler(req, res) {
  console.log(req, "req");
  try {
    // 요청의 body를 JSON 문자열로 변환
    const requestBody = JSON.stringify(req.body);
    console.log(requestBody, "req body");

    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `${requestBody} What kind of job is this resume for? Tell me your job in one word in English`,
        },
      ],
      model: "gpt-3.5-turbo",
      // 여기에 추가적인 옵션을 지정할 수 있습니다.
    });

    // API 호출 결과를 추출하고 클라이언트에 전달
    const result =
      response.data.choices[0].message.content?.trim() ||
      "Sorry, there was a problem";
    res.status(200).json({ message: result });
  } catch (error) {
    // 에러 처리
    console.error("An error occurred:", error);

    // 클라이언트에 에러 응답 전송
    res.status(500).json({ message: "Internal server error" });
  }
}
