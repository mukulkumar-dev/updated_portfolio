import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const SIZE = 500;

export const CursorGlow = () => {
  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const springX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 -z-10 hidden lg:block pointer-events-none"
      style={{
        width: SIZE,
        height: SIZE,
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, hsl(173 80% 50% / 0.07) 0%, transparent 70%)",
      }}
    />
  );
};
