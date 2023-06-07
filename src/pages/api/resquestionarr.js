import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Invalid JSON");
    return;
  }

  const resume = req.body.text;
  const myJob = req.body.resultJob;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Please give me all the answers in Korean. Read the text and write one technical question for the interviewer.The questions are as detailed as possible and consist of required professional questions",
      },
      {
        role: "user",
        content: `Please answer all the answers in Korean , ${myJob} Please  required one interview questions for the job interview,
        ${resume}Based on this article`,
      },
    ],
  });

  const result =
    response.data.choices[0].message.content || "sorry, there was a problem";

  res.status(200).json(result);
}
