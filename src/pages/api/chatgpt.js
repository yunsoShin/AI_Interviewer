import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const resume = req.body.text;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${resume} 면접관이 질문할만한 기술적인 질문을 10개 목록을 작성해서 중요도 순서로 보여줘`,
      },
    ],
  });

  const result =
    response.data.choices[0].message || "sorry, there was a problem";
  res.status(200).json(result);
}
