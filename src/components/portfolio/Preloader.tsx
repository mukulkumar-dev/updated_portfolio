import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import mukulLogo from "@/assets/mukul-logo.png";

const NAME = "Mukul Kumar";
const BOOT_LINES = [
  { at: 0, text: "$ npm run portfolio" },
  { at: 25, text: "✓ loading projects" },
  { at: 50, text: "✓ compiling skills" },
  { at: 75, text: "✓ brewing coffee" },
  { at: 100, text: "✓ ready — welcome!" },
];
const RING_RADIUS = 58;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const LOGO_FILTER = "invert(1) drop-shadow(0 0 14px hsl(173 80% 50% / 0.5))";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const isDone = progress >= 100;

  // Drive the 0 → 100 counter with an ease-out curve so it slows near the end.
  useEffect(() => {
    const duration = reduceMotion ? 600 : 2400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  // Hold briefly on 100% so "ready" is readable, then hand off to the page.
  useEffect(() => {
    if (!isDone) return;
    const timeout = setTimeout(onComplete, reduceMotion ? 150 : 550);
    return () => clearTimeout(timeout);
  }, [isDone, onComplete, reduceMotion]);

  // Prevent scrolling the page underneath while the intro plays.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
      exit={{ y: "-100%" }}
      transition={{ duration: reduceMotion ? 0.3 : 0.9, ease: [0.76, 0, 0.24, 1] }}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Themed backdrop */}
      <div className="absolute inset-0 animated-grid" />
      <div className="hero-glow" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

      {/* Glowing leading edge of the curtain as it slides away */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "var(--gradient-primary)", boxShadow: "0 0 24px 2px hsl(var(--primary) / 0.6)" }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6"
        animate={isDone ? { opacity: 0, scale: 0.96, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeIn", delay: isDone ? 0.15 : 0 }}
      >
        {/* Logo inside a self-drawing gradient ring */}
        <div className="relative w-36 h-36 mb-8">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 128 128" aria-hidden="true">
            <defs>
              <linearGradient id="preloader-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(173 80% 50%)" />
                <stop offset="100%" stopColor="hsl(280 80% 60%)" />
              </linearGradient>
            </defs>
            <circle cx="64" cy="64" r={RING_RADIUS} fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
            <circle
              cx="64"
              cy="64"
              r={RING_RADIUS}
              fill="none"
              stroke="url(#preloader-ring)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress / 100)}
              style={{ filter: "drop-shadow(0 0 6px hsl(173 80% 50% / 0.6))" }}
            />
          </svg>

          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-primary/20"
            animate={reduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ margin: 14 }}
          />

          <motion.img
            src={mukulLogo}
            alt=""
            className="absolute inset-0 m-auto h-14 w-auto object-contain"
            // The animated filter replaces any CSS filter, so invert (to white) and the glow live here too.
            initial={{ opacity: 0, scale: 0.6, filter: `${LOGO_FILTER} blur(8px)` }}
            animate={{ opacity: 1, scale: 1, filter: `${LOGO_FILTER} blur(0px)` }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          />
        </div>

        {/* Name, revealed letter by letter */}
        <h1 className="flex text-4xl md:text-6xl font-bold mb-2" aria-label={NAME}>
          {NAME.split("").map((char, i) => (
            <span key={i} className="overflow-hidden inline-block" aria-hidden="true">
              <motion.span
                className="inline-block shimmer-text"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.04, ease: EASE_OUT_EXPO }}
              >
                {char === " " ? " " : char}
              </motion.span>
            </span>
          ))}
          <motion.span
            className="text-gradient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            .
          </motion.span>
        </h1>

        <motion.p
          className="font-mono text-sm text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Full-Stack Developer
        </motion.p>

        {/* Terminal boot log */}
        <div className="glass-card rounded-xl w-72 max-w-full px-4 py-3 font-mono text-xs">
          <div className="flex gap-1.5 mb-2" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="h-[6.5rem] flex flex-col justify-end">
            {BOOT_LINES.filter((line) => progress >= line.at).map((line, i) => (
              <motion.p
                key={line.text}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={i === 0 ? "text-muted-foreground" : "text-primary"}
              >
                {line.text}
              </motion.p>
            ))}
          </div>

          {/* Progress bar + counter */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${progress}%`, background: "var(--gradient-primary)" }}
              />
            </div>
            <span className="tabular-nums text-foreground w-9 text-right">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
