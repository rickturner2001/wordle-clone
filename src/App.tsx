import { useEffect, useRef, useState } from "react";
import GameGrid from "./GameGrid";
import { GameStatus } from "./utils";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const App = () => {
  const [gameStatus, setGameStatus] = useState(GameStatus.INITIAL);

  return (
    <div
      tabIndex={2}
      className={`${
        gameStatus === GameStatus.LOSS
          ? "bg-red-600 text-white"
          : gameStatus === GameStatus.WIN
          ? "bg-green-500 text-white"
          : ""
      } h-screen w-screen flex justify-center items-center flex-col  rounded-md p-4`}
    >
      <div className="py-6 flex justify-between items-center">
        <h1 className=" text-4xl font-indie font-bold text-center">
          {gameStatus === GameStatus.INITIAL ||
          gameStatus === GameStatus.IN_PROGRESS
            ? "Simple Wordle Game"
            : gameStatus === GameStatus.LOSS
            ? "Nice try but you lost 😢"
            : "Great job! you won 😊"}
        </h1>
        {gameStatus !== GameStatus.INITIAL && (
          <button
            onClick={() => {
              setGameStatus(GameStatus.IN_PROGRESS);
            }}
            className={` ml-12 ${
              gameStatus === GameStatus.LOSS
                ? "bg-white text-red-600"
                : gameStatus === GameStatus.IN_PROGRESS
                ? "bg-indigo-500 text-white"
                : "bg-white text-green-500"
            } shadow-md rounded-full  p-2 flex items-center justify-center`}
          >
            <ArrowPathIcon className="h-5 w-5  " />
          </button>
        )}
      </div>
      {gameStatus === GameStatus.IN_PROGRESS && (
        <GameGrid gameStatus={gameStatus} setGameStatus={setGameStatus} />
      )}

      {gameStatus == GameStatus.INITIAL && (
        <div className="w-full flex justify-center  items-center">
          <motion.button
            onClick={() => {
              setGameStatus(GameStatus.IN_PROGRESS);
            }}
            className="py-2 px-4 w-max bg-indigo-500 text-2xl text-white rounded-full border-white font-indie  shadow-md"
            initial={{}}
            whileHover={{
              scale: 1.1,
            }}
            transition={{
              type: "tween",
              duration: 0.3,
            }}
            whileTap={{
              scale: 0.9,
            }}
          >
            Start a Game
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default App;
