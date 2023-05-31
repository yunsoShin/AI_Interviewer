import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const requestBody = JSON.stringify(req.body); // 요청의 body를 JSON 문자열로 변환
  console.log("Request Body:", requestBody);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `You are a job interviewer. you look at the resume \n\n${requestBody}
    You write 10 as detailed as possible technical questions on portfolio`,
    temperature: 0.5,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  const result =
    response.data.choices[0].text?.trim() || "sorry,there was a problem";
  res.status(200).json(result);
}
