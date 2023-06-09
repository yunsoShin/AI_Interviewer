import { useState, useEffect } from "react";
import { convertPdf, getJob } from "../utils/fetchapis";
import Addquestion from "./addquestion";
import { uploadResume } from "../pages/api/firebase";
import { useAuthContext } from "@/pages/_app";

const FileInput = ({ setSelectedFile }) => (
  <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
);

export default function UploadPDF() {
  const { uid } = useAuthContext();
  const [selectedFile, setSelectedFile] = useState();
  const [resultConvert, setResultConvert] = useState();
  const [resultJob, setResultJob] = useState();
  const [loading, setLoading] = useState(false);

  const uploadAndConvertFile = async (file) => {
    try {
      setLoading(true);
      const resultConvert = await convertPdf(file);
      setResultConvert(resultConvert);
      const resultJob = await getJob(resultConvert);
      setResultJob(resultJob);
      const resume = resultConvert.toString();
      await uploadResume(resume, uid);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadAndConvertFile(selectedFile);
    }
  }, [selectedFile]);

  return (
    <div>
      <FileInput setSelectedFile={setSelectedFile} />
      {loading && <div>Uploading and converting...</div>}
      {resultConvert && resultJob && (
        <Addquestion resultConvert={resultConvert} resultJob={resultJob} />
      )}
    </div>
  );
}
