import { useState, useEffect } from "react";
import { createParser } from "eventsource-parser";

export const useFetchAndParse = (content) => {
  const [loading, setLoading] = useState(false);
  const [generatedBios, setGeneratedBios] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
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
        const chunkValue = decoder.decode(value, { stream: true });
        parser.feed(chunkValue);
      }
      setLoading(false);
    };

    if (content) {
      fetchData();
    }
  }, [content]);

  return { loading, generatedBios, setGeneratedBios, setLoading };
};
