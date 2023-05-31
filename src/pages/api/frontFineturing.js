const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function FrontFineTuring() {
  const response = await openai.createFile(
    fs.createReadStream("frontendInterview.jsonl"),
    "fine-tune"
  );
  console.log(`File ID ${response.data.id}`);
  return response.data.id;
}
