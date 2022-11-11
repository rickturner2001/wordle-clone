import { motion } from "framer-motion";
import { useState } from "react";

export const Square = ({
  letter,
  content,
  rowNum,
  validatedRows,
  word,
}: {
  letter: string;
  content: string;
  rowNum: number;
  validatedRows: number[];
  word: string;
}) => {
  const [hasContent, setHasContent] = useState(content);

  return (
    <motion.div
      className={` ${
        validatedRows.includes(rowNum)
          ? letter === content
            ? "bg-green-500 text-white"
            : word.split("").includes(content)
            ? "bg-yellow-500 text-white"
            : "bg-gray-500 text-white"
          : "bg-white   "
      } " h-24 w-24 border shadow-md rounded-md font-indie select-none "`}
      animate={
        content && {
          scale: 1.1,
        }
      }
      transition={{
        type: "spring",
      }}
    >
      <p
        className={`w-full h-full p-2  text-5xl uppercase font-bold text-center flex items-center justify-center`}
      >
        {content}
      </p>
    </motion.div>
  );
};
