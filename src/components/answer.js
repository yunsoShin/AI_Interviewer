import React from "react";
import { useState } from "react";

function Answer(prompt) {
  const [bio, setBio] = useState("");
  console.log(prompt);
  return (
    <>
      {
        <div className=" max-w-7xl  w-full">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={"This is conducted/progressed by chain reactions."}
          />
        </div>
      }
    </>
  );
}

export default Answer;

//This is conducted/progressed by chain reactions.
