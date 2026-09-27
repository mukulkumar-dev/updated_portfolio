import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Velaris from "@/components/ui/velaris";
import { useTypewriter } from "@/hooks/use-typewriter";
import profilePhoto from "@/assets/WhatsApp Image 2026-05-30 at 21.44.46 (1).jpeg";

const ROLES = ["MERN/MEAN Developer", "Frontend Developer", "Backend Developer", "App Developer"];

export const Hero = () => {
  const typedRole = useTypewriter(ROLES);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated WebGL gradient background */}
      <Velaris
        className="absolute inset-0 z-0"
        height="100%"
        bg="#080C17"
        colors={["#1AE6CE", "#B447EB", "#0F8F80", "#080C17"]}
        speed={1}
        grain={0.12}
      />
      <div className="absolute inset-0 z-0 bg-background/55" />
      
      {/* Floating Code Elements */}
      <motion.div
        className="absolute top-32 left-10 text-muted-foreground/30 font-mono text-sm hidden lg:block floating"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {"const developer = {"}
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-10 text-muted-foreground/30 font-mono text-sm hidden lg:block floating-delayed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        {"};"}
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-mono text-lg mb-6"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          >
            <span className="shimmer-text">Mukul Kumar</span>
            <span className="text-gradient">.</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-muted-foreground mb-8"
          >
            I build and own products for the web.
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              className="inline-block w-[0.5ch] ml-1 text-primary"
            >
              |
            </motion.span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center gap-2 font-mono text-lg md:text-xl text-primary mb-6 h-[1.5em]"
          >
            <span className="text-muted-foreground">{">"}</span>
            <span className="whitespace-nowrap overflow-hidden">{typedRole}</span>
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              className="inline-block w-[2px] h-[1em] bg-primary"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          >
            I'm a <span className="text-foreground font-medium">Full Stack Developer</span>{" "}
            building <span className="text-primary">B2B and B2C products</span> end-to-end —
            from interactive UI and scalable architecture to APIs and{" "}
            <span className="text-primary">AI/ML, payment, and affiliate integrations</span>{" "}
            for the <span className="text-foreground font-medium">Indian and US markets</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:glow-effect transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent transition-transform duration-1000" />
              <span className="relative">View My Work</span>
              <ArrowDown className="relative w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-6"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:3003mukulkumar@gmail.com"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
            >
              <Mail size={24} />
            </a>
            <div className="w-24 h-px bg-muted-foreground/30" />
          </motion.div>
        </div>

        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative hidden lg:flex justify-center items-center"
        >
          {/* Rotating gradient ring — thin single-line stroke, not a filled disc */}
          <motion.div
            className="absolute w-[22rem] h-[22rem] rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, hsl(173 80% 50%), hsl(280 80% 60%), hsl(173 80% 50% / 0.2), hsl(280 80% 60%), hsl(173 80% 50%))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
              filter: "drop-shadow(0 0 4px hsl(173 80% 50% / 0.5))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Thin counter-rotating accent ring for depth */}
          <motion.div
            className="absolute w-[21rem] h-[21rem] rounded-full opacity-60"
            style={{
              background:
                "conic-gradient(from 90deg, transparent 0%, hsl(280 80% 60%) 8%, transparent 20%)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 1px), #000 calc(100% - 1px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), #000 calc(100% - 1px))",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />

          {/* Pulsing glow */}
          <motion.div
            className="absolute w-[19rem] h-[19rem] rounded-full bg-primary/15 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating photo */}
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.04 }}
            className="relative z-10 w-72 h-72 md:w-80 md:h-80 rounded-full p-[3px] bg-gradient-to-br from-primary via-accent to-primary shadow-[var(--shadow-glow)]"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
              <img
                src={profilePhoto}
                alt="Mukul Kumar"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Orbiting accent dots */}
          <motion.div
            className="absolute w-[24rem] h-[24rem]"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-effect" />
            <div className="absolute bottom-4 right-4 w-2.5 h-2.5 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};
