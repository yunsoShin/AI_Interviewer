import OpenAI from "openai";

const openai = new OpenAI();
export default async function handler(req, res) {
  const requestBody = JSON.stringify(req.body); // 요청의 body를 JSON 문자열로 변환
 const response = await openai.chat.completions.create({
    messages: [{ role: "system", content: `${requestBody} What kind of job is this resume for? Tell me your job in one word in English`, }],
   model: "gpt-3.5-turbo",
    temperature: 0.2,
    max_tokens: 20,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });


  const result =
    response.data.choices[0].message.content?.trim() || "sorry,there was a problem";

  res.status(200).json(result);
}


