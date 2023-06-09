import React from "react";
import { useState, useRef, useEffect } from "react";
import CardSwiper from "./cardswiper";
import { convertPdf, getJob, getQuestionArr } from "../utils/fetchapis";
import { Toaster, toast } from "react-hot-toast";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

function Addquestion({ resultConvert, resultJob }) {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [generatedBios, setGeneratedBios] = useState("");
  const bioRef = useRef(null);
  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [selectedFile, setSelectedFile] = useState();
  const [splitContent, setSplitContent] = useState();
  useEffect(() => {
    if ((resultConvert, resultJob)) {
      const fetchData = async () => {
        setLoading(true);
        const response = await fetch("/api/resquestionarr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resultConvert: resultConvert,
            resultJob: resultJob,
          }),
        });

        const data = response.body;

        if (!data) {
          return;
        }

        const onParse = (event) => {
          if (event.type === "event") {
            const data = event.data;
            try {
              const text = JSON.parse(data).text ?? "";
              setGeneratedBios((prev) => prev + text);
            } catch (e) {
              console.error(e);
            }
          }
        };

        const reader = data.getReader();
        const decoder = new TextDecoder();
        const parser = createParser(onParse);
        let done = false;
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          parser.feed(chunkValue);
        }
        scrollToBios();
        setLoading(false);
      };

      fetchData();
    }
  }, [resultConvert, resultJob]);

  return (
    <div>
      <>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto text-center"
                  ref={bioRef}
                >
                  AI interviewer
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split("2.")
                  .map((generatedBio, index) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("Bio copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={index}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
}

export default Addquestion;
