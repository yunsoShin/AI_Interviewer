import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Create a list of 8 questions for my interview with a science fiction author:",
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
