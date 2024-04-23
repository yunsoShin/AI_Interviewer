import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertResume} from "../utils/fetchapis";
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
  const [resumeType, setResumeType] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    setResumeType(acceptedFiles[0]?.type);
    switch (acceptedFiles[0]?.type) {
      case "application/pdf":
        setSelectedFile(acceptedFiles[0]);
        break;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        setSelectedFile(acceptedFiles[0]);
        break;
      case "application/vnd.ms-excel":
        setSelectedFile(acceptedFiles[0]);
        break;
      default:
        toast.error("지원하지 않는 파일 형식입니다.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadAndConvertFile = async (file) => {
    try {
      setLoading(true);
      const resultConvert = await convertResume(file);
      const resume = resultConvert.toString();
      {
        uid && (await uploadResume(resume, uid));
      }
      const splitResume = splitStringAt(resume, 1500);

      setContent([
        {
          role: "system",
          content: `When a user attaches a resume, they generate five interview expected questions for that resume. 
All questions are divided into "/1./" and "/2./" and "/3./" and "/4./" and "/5./." in korean!!`,
        },
        {
          role: "user",
          content:`${splitResume} job interview`,
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
      <Toaster />
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
