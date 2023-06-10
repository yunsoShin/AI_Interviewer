import React from "react";
import { useState } from "react";

function Answer(props) {
  const [bio, setBio] = useState("");

  return (
    <div className="flex">
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={4}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
        placeholder={
          "e.g. Senior Developer Advocate @vercel. Tweeting about web development, AI, and React / Next.js. Writing nutlope.substack.com."
        }
      />
    </div>
  );
}

export default Answer;

//This is conducted/progressed by chain reactions.
