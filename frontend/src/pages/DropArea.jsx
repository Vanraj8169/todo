import { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      className={
        showDrop
          ? "w-80 h-24  border border-dashed border-violet-500 rounded-lg p-4 mb-4 flex justify-center items-center opacity-100 transition-all duration-200 ease-in-out"
          : "opacity-0"
      }
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      Drop Area
    </section>
  );
};

export default DropArea;
