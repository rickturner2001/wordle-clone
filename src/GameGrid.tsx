import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import fiveLEtterWords from "./assets/fiveLetterWords.json";
import { Square } from "./components/Square";
import { GameStatus, letters } from "./utils";

function GameGrid({
  gameStatus,
  setGameStatus,
}: {
  gameStatus: GameStatus;
  setGameStatus: Dispatch<SetStateAction<GameStatus>>;
}) {
  const randomWords = () => {
    const words: string[] = [];
    const randomWord =
      fiveLEtterWords[Math.floor(Math.random() * fiveLEtterWords.length)];
    for (let i = 0; i < 6; i++) {
      words.push(randomWord);
    }

    return words;
  };

  const [activeRow, setActiveRow] = useState(0);
  const [keysPressed, setKeysPressed] = useState([] as string[]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [validatedRows, setValidatedRows] = useState([] as number[]);
  const [randomizedWords, _] = useState(randomWords());

  const [validatedWords, setValidatedWords] = useState([] as string[]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <motion.div className="h-full w-full flex justify-center items-center">
      <motion.div
        onKeyDown={(e) => {
          if (e.key == "Backspace") {
            if (keysPressed.length > 0) {
              setKeysPressed((prev) => {
                return prev.slice(0, -1);
              });
            }
          } else if (
            !letters.includes(e.key.toLowerCase()) &&
            !(e.key === "Enter" && keysPressed.length === 5)
          ) {
            return;
          } else if (keysPressed.length < 5) {
            setKeysPressed((prev) => [...prev, e.key.toLowerCase()]);
          } else {
            if (e.key === "Enter") {
              setValidatedRows((prev) => [...prev, activeRow]);
              setActiveRow((prev) => prev + 1);
              setValidatedWords((prev) => [...prev, keysPressed.join("")]);
              if (keysPressed.join("") === randomizedWords[0]) {
                setGameStatus(GameStatus.WIN);
              } else {
                // LAST ACTIVE ROW IS WRONG
                if (activeRow === 5) {
                  setGameStatus(GameStatus.LOSS);
                }
              }
              setKeysPressed([]);
            }
          }
        }}
        tabIndex={1}
        ref={containerRef}
        initial={{
          backgroundColor: "rgb(255, 255, 255)",
        }}
        whileFocus={{
          backgroundColor: "rgb(99 102 241)",
        }}
        className="grid w-max grid-cols-5 grid-rows-6 gap-x-4 gap-y-4  rounded-md p-8"
      >
        {randomizedWords.map((word, rowNum) => {
          return word.split("").map((char, index) => {
            return (
              <Square
                rowNum={rowNum}
                word={word}
                validatedRows={validatedRows}
                content={
                  validatedRows.includes(rowNum)
                    ? validatedWords[rowNum].charAt(index)
                    : rowNum === validatedRows.length &&
                      index < keysPressed.length
                    ? keysPressed[index]
                    : ""
                }
                key={rowNum + index}
                letter={char}
              />
            );
          });
        })}
      </motion.div>
    </motion.div>
  );
}

export default GameGrid;
