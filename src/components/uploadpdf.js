import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertPdf, getJob } from "../utils/fetchapis";
import Addquestion from "./addquestion";
import { uploadResume } from "../pages/api/firebase";
import { useAuthContext, useUploadProcess } from "@/pages/_app";
import { Toaster, toast } from "react-hot-toast"; // Add this line

export default function UploadPDF() {
  const { resultConvert, setResultConvert, resultJob, setResultJob } =
    useUploadProcess();
  const { uid } = useAuthContext();
  const [selectedFile, setSelectedFile] = useState();

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

      {
        uid && (await uploadResume(resume, uid));
      }
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
    <div
      className="
    "
    >
      <Toaster /> {/* Add this line */}
      {resultConvert && resultJob && (
        <Addquestion resultConvert={resultConvert} resultJob={resultJob} />
      )}
      {loading && (
        <div className=" text-center">Uploading and converting...</div>
      )}
      {!loading && !resultConvert && !resultJob && (
        <div
          {...getRootProps()}
          className="flex border-2 border-gray-400 rounded-md justify-center items-center p-4  text-center w-full h-full transition duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          <input {...getInputProps()} className="cursor-pointer" />
          {isDragActive ? (
            <p className="flex  justify-center items-center p-4  text-center w-full h-full cursor-pointer">
              Drop the files here ...
            </p>
          ) : (
            <p className="flex justify-center items-center p-4 w-full h-full cursor-pointer">
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
        </div>
      )}
    </div>
  );
}
