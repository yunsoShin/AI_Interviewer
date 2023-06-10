import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertPdf, getJob } from "../utils/fetchapis";
import Addquestion from "./addquestion";
import { uploadResume } from "../pages/api/firebase";
import { useAuthContext } from "@/pages/_app";
import { Toaster, toast } from "react-hot-toast"; // Add this line

export default function UploadPDF() {
  const { uid } = useAuthContext();
  const [selectedFile, setSelectedFile] = useState();
  const [resultConvert, setResultConvert] = useState();
  const [resultJob, setResultJob] = useState();
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (
      acceptedFiles.length > 0 &&
      acceptedFiles[0].type === "application/pdf"
    ) {
      setSelectedFile(acceptedFiles[0]);
    } else {
      toast.error("Only PDF files are accepted."); // Use the toast.error function
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
      <Toaster /> {/* Add this line */}
      {resultConvert && resultJob && (
        <Addquestion resultConvert={resultConvert} resultJob={resultJob} />
      )}
      {loading && (
        <div className=" text-center">Uploading and converting...</div>
      )}
      {!loading && (
        <div
          className=" w-40 h-24 flex justify-center items-center border-2  border-gray-400 rounded-md"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-center">Drop the files here ...</p>
          ) : (
            <p className=" text-center">
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
        </div>
      )}
    </div>
  );
}
