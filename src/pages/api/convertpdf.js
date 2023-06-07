import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import pdfParse from "pdf-parse";

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  await new Promise((resolve, reject) =>
    upload.single("file")(req, res, (err) => (err ? reject(err) : resolve()))
  );

  try {
    const data = await pdfParse(req.file.buffer);
    res.send(data.text);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error parsing PDF");
  }
};
