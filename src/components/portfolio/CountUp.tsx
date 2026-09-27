import { animate } from "framer-motion";
import { useEffect, useState } from "react";

interface CountUpProps {
  value: number;
  isInView: boolean;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
}

export const CountUp = ({
  value,
  isInView,
  duration = 1.4,
  delay = 0,
  decimals = 0,
  suffix = "",
}: CountUpProps) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [isInView, value, duration, delay]);

  return (
    <>
      {display.toFixed(decimals)}
      {suffix}
    </>
  );
};
