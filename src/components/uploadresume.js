import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertPdf, getJob } from "../utils/fetchapis";
import Addquestion from "./addquestion";
import { uploadResume } from "../pages/api/firebase";
import { useAuthContext, useAIProcess } from "@/pages/_app";
import { Toaster, toast } from "react-hot-toast"; // Add this line

function splitStringAt(string, length) {
  return string.slice(0, length);
}

export default function UploadPDF() {
  const { setResultConvert, setResultJob, setContent, content } =
    useAIProcess();
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
      const resume = resultConvert.toString();
      {
        uid && (await uploadResume(resume, uid));
      }
      const splitResume = splitStringAt(resume, 1500);
      setResultConvert(resultConvert);
      const resultJob = await getJob(splitResume);
      setResultJob(resultJob);
      setContent([
        {
          role: "system",
          content: `Please answer all your answers in Korean. Questions are separated into formats such as "/1./" and "/2./".  These questions are as technical as possible and consist of required job questions`,
        },
        {
          role: "user",
          content: `Please answer all the answers in Korean, write 5 interview question for the ${resultJob} job interview,
          please write technical questions that the interviewer can ask and write a total of 5 questions
          Questions are separated into formats such as "/1./" and "/2./`,
        },
      ]);
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
      className=" sm:w-3/6
    "
    >
      <Toaster /> {/* Add this line */}
      {loading && (
        <div className="text-center">Uploading and converting...</div>
      )}
      {!loading && !content && (
        <div
          {...getRootProps()}
          className="flex border-2 border-gray-400 rounded-md justify-center items-center p-4  text-center w-full h-full transition duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          <input
            {...getInputProps()}
            className="cursor-pointer flex justify-center items-center p-4 w-full h-full "
          />
          {isDragActive ? (
            <p className="flex  justify-center items-center p-4  text-center w-full h-full cursor-pointer">
              Drop the files here ...
            </p>
          ) : (
            <p className="flex justify-center items-center p-4 w-full h-full cursor-pointer">
              Drag 'n' drop some files here, or click to select resume
            </p>
          )}
        </div>
      )}
    </div>
  );
}
