import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface TimerFuseProps {
  timeLeft: number;
  timeLimit: number;
  isActive: boolean;
}

export function TimerFuse({ timeLeft, timeLimit, isActive }: TimerFuseProps) {
  const controls = useAnimation();
  const initialTimeRef = useRef(timeLeft);

  useEffect(() => {
    if (isActive) {
      initialTimeRef.current = timeLeft;
      const initialWidth = (timeLeft / timeLimit) * 100;

      controls.set({ width: `${initialWidth}%` });
      controls.start({
        width: "0%",
        transition: { duration: timeLeft, ease: "linear" },
      });
    } else {
      controls.stop();
    }

    return () => controls.stop();
  }, [timeLeft, timeLimit, isActive, controls]);

  return (
    <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 to-yellow-500 shadow-lg"
        animate={controls}
      />
    </div>
  );
}
