import { motion } from "framer-motion";

interface AnimatedDividerProps {
  isInView: boolean;
  delay?: number;
  className?: string;
}

export const AnimatedDivider = ({ isInView, delay = 0.3, className = "" }: AnimatedDividerProps) => (
  <motion.div
    initial={{ scaleX: 0 }}
    animate={isInView ? { scaleX: 1 } : {}}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    style={{ transformOrigin: "left" }}
    className={`flex-1 h-px bg-gradient-to-r from-primary/60 via-border to-transparent max-w-xs ${className}`}
  />
);
