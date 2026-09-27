import { motion, useScroll, useTransform } from "framer-motion";

export const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, 340]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated grid */}
      <div className="absolute inset-0 animated-grid opacity-60" />

      {/* Animated gradient wash */}
      <div className="absolute inset-0 animated-gradient-bg opacity-40" />

      {/* Floating blobs — outer div carries scroll parallax, inner div carries the CSS blob animation, so their transforms don't fight */}
      <motion.div
        style={{ y: yMid }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px]"
      >
        <div
          className="w-full h-full rounded-full blur-3xl animate-blob"
          style={{ background: "radial-gradient(circle, hsl(173 80% 50% / 0.18), transparent 70%)" }}
        />
      </motion.div>
      <motion.div
        style={{ y: yFast }}
        className="absolute top-[40%] right-[-10%] w-[600px] h-[600px]"
      >
        <div
          className="w-full h-full rounded-full blur-3xl animate-blob"
          style={{
            background: "radial-gradient(circle, hsl(280 80% 60% / 0.15), transparent 70%)",
            animationDelay: "5s",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: ySlow }}
        className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px]"
      >
        <div
          className="w-full h-full rounded-full blur-3xl animate-blob"
          style={{
            background: "radial-gradient(circle, hsl(200 80% 55% / 0.15), transparent 70%)",
            animationDelay: "10s",
          }}
        />
      </motion.div>

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
};
