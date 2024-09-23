import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimerFuseProps {
  timeLeft: number;
  timeLimit: number;
}

export function TimerFuse({ timeLeft, timeLimit }: TimerFuseProps) {
  const [fuseWidth, setFuseWidth] = useState((timeLeft / timeLimit) * 100);

  useEffect(() => {
    setFuseWidth((timeLeft / timeLimit) * 100);
  }, [timeLeft, timeLimit]);

  return (
    <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-yellow-500 shadow-lg"
        initial={{ width: "100%" }}
        animate={{ width: `${fuseWidth}%` }}
        transition={{ ease: "linear", duration: 1 }}
      />
    </div>
  );
}
