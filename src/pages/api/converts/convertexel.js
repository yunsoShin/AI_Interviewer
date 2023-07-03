import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import XLSX from "xlsx";

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
    // Parse Excel file
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    // Get the first worksheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    // Convert the worksheet to JSON
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    // Convert JSON data to text
    const text = JSON.stringify(data, null, 2);
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error parsing Excel file");
  }
};
