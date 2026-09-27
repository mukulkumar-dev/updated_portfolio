import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";
import mukulLogo from "@/assets/mukul-logo.png";

export const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="relative py-10 border-t border-border overflow-hidden" ref={ref}>
      {/* Glowing top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-md h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="drop-shadow-[0_0_10px_hsl(var(--primary)/0.3)]"
          >
            <img
              src={mukulLogo}
              alt="Mukul Kumar logo"
              className="h-12 w-auto object-contain invert"
            />
          </motion.a>

          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Designed & Built with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </motion.span>
            by Mukul Kumar
          </p>

          <p className="text-muted-foreground/60 text-xs font-mono">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
