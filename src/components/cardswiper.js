import { useState } from "react";

export default function CardSwiper({ data }) {
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevCard = () => {
    setIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };
  if (!data) {
    return null; // or you can return a loading spinner, a placeholder component etc.
  }

  return (
    <div>
      <div>{data[index]}</div>
      <button onClick={nextCard}>Next</button>
      <button onClick={prevCard}>Previous</button>
    </div>
  );
}
