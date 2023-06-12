export const config = {
  runtime: "edge",
};

export default async function handler(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).send("Invalid JSON");
    return;
  }
  const body = await req.json();

  const payload = body.payload;
  const stream = `${payload} 테스트용 코드입니다`;
  return new Response(stream, {
    headers: new Headers({
      "Cache-Control": "no-cache",
    }),
  });
}
