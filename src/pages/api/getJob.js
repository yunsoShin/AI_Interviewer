import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const requestBody = JSON.stringify(req.body); // 요청의 body를 JSON 문자열로 변환

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${requestBody} What kind of job is this resume for? Tell me your job in one word in English`,
    temperature: 0.2,
    max_tokens: 20,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  const result =
    response.data.choices[0].text?.trim() || "sorry,there was a problem";

  res.status(200).json(result);
}
