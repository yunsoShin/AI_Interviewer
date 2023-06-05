import { useState } from "react";

export default function CardSwiper({ data }) {
  const [index, setIndex] = useState(0);

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevCard = () => {
    setIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  return (
    <div>
      <button onClick={prevCard}>Previous</button>
      <div>{data[index]}</div>
      <button onClick={nextCard}>Next</button>
    </div>
  );
}
