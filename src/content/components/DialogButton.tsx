import React, { useState } from "react";
import {
  AnimatePresence,
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import StarIcon from "./icons/StarIcon";

interface StarProps {
  id: number;
  x: number;
  y: number;
  onComplete: (id: number) => void;
}

const Star: React.FC<StarProps> = ({ x, y, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: 1, x: x, y: y, scale: 0.7 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onAnimationComplete={() => onComplete(0)}
      className="tw-absolute tw-text-yellow-200 tw-drop-shadow-[1px_1px_1px_#6a6a6a85]"
    >
      <StarIcon />
    </motion.div>
  );
};

const DialogButton = ({
  children,
  className,
  ...props
}: HTMLMotionProps<"button">) => {
  const [stars, setStars] = useState<number[]>([]);

  // Generate random positions for stars
  const generatePositions = () => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 10 + 40; // Distance between 50px to 150px
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    return { x, y };
  };

  return (
    <div className="tw-relative tw-flex tw-items-center tw-justify-center">
      <motion.button
        className={cn(
          "tw-bg-gradient-to-b tw-from-orange-200 tw-to-yellow-100 tw-relative",
          className
        )}
        {...props}
        onClick={(e) => {
          props?.onClick?.(e);
          setStars(new Array(10).fill(0));
        }}
      >
        {children}
      </motion.button>
      <AnimatePresence>
        {stars.map((id) => {
          const { x, y } = generatePositions();
          return (
            <Star
              key={id}
              id={id}
              x={x}
              y={y}
              onComplete={() => setStars([])}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default DialogButton;
