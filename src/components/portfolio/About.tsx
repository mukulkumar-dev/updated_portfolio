import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Code2, Sparkles, Target, Zap } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

const aboutTabs = [
  {
    id: "background",
    label: "Background",
    content: (
      <p className="text-muted-foreground text-lg leading-relaxed">
        I'm a passionate{" "}
        <span className="text-foreground font-medium">Software Developer and Full Stack Engineer</span> with a{" "}
        <span className="text-foreground font-medium">B.Tech in Computer Science</span> from{" "}
        <span className="text-primary">GLA University, Mathura</span>, graduating with an{" "}
        <span className="text-primary">8.2 CGPA with Honors</span>. I also hold a Diploma in
        Computer Science, where I graduated with <span className="text-primary">Honors (80.95%)</span>.
        That academic foundation, paired with hands-on project work since early on, shaped how I
        approach problems today — I like understanding a system end-to-end before writing a
        single line of code, and I care as much about clean, maintainable structure as I do
        about shipping fast.
      </p>
    ),
  },
  {
    id: "role",
    label: "Current Role",
    content: (
      <p className="text-muted-foreground text-lg leading-relaxed">
        Currently, I work as an{" "}
        <span className="text-foreground font-medium">Associate Software Engineer Trainee</span> at{" "}
        <span className="text-primary">JungleWorks</span>, contributing to and taking ownership
        of <span className="text-primary">B2B and B2C products</span>. My work spans the complete
        product lifecycle — from building intuitive frontend experiences and scalable backend
        services to integrating third-party APIs, optimizing performance, and delivering
        production-ready features. I've helped build and optimize products like{" "}
        <span className="font-mono text-foreground">Rivia.ai</span>, a B2B interactive demo
        platform, and <span className="font-mono text-foreground">Benny</span>, an AI-powered
        fashion app — working across Demos, Tours, Product Management, Workspaces, onboarding
        workflows, product discovery, semantic search, creator content pipelines, affiliate
        integrations, and analytics tracking.
      </p>
    ),
  },
  {
    id: "stack",
    label: "Tech Stack",
    content: (
      <div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-5">
          I work across{" "}
          <span className="font-mono text-primary">MERN/MEAN stack development</span>, along
          with <span className="text-foreground font-medium">Flutter</span> for application
          development. I also have hands-on experience with{" "}
          <span className="text-primary">
            AI integrations, payment systems, affiliate marketing, analytics, and third-party
            service integrations
          </span>{" "}
          across both the <span className="text-foreground font-medium">Indian and US markets</span>,
          which means designing for currency, compliance, and infrastructure differences on top
          of the usual product requirements.
        </p>
        <div className="flex flex-wrap gap-2">
          {["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Flutter"].map(
            (tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-mono cursor-default hover:bg-primary/20 transition-colors"
              >
                {tech}
              </motion.span>
            ),
          )}
        </div>
      </div>
    ),
  },
  {
    id: "approach",
    label: "Approach",
    content: (
      <p className="text-muted-foreground text-lg leading-relaxed">
        I enjoy taking ownership of technical problems, improving product performance, and
        turning business requirements into{" "}
        <span className="text-primary">scalable, reliable, and user-focused digital products</span>.
        I care about writing code that the next person — often future me — can read without a
        walkthrough, staying close to design and product during scoping instead of after, and
        treating performance and reliability as features, not afterthoughts. Whether it's a demo
        widget or a payment flow, I'd rather ship something smaller and solid than something
        large and fragile.
      </p>
    ),
  },
];

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description:
      "Building and maintaining scalable B2B and B2C applications across frontend, backend, APIs, databases, and production workflows.",
  },
  {
    icon: Sparkles,
    title: "AI & Product Integration",
    description:
      "Integrating AI/ML APIs, embeddings, semantic search, automation, and intelligent product features into real-world applications.",
  },
  {
    icon: Target,
    title: "Product Ownership",
    description:
      "Taking ownership of features and products from requirement analysis and development to optimization, third-party integrations, and production delivery.",
  },
  {
    icon: Zap,
    title: "Performance & Scalability",
    description:
      "Optimizing frontend performance, API workflows, caching, databases, and cloud functions to build faster and more reliable products.",
  },
];

const stats = [
  { value: 8.2, decimals: 1, suffix: "", label: "CGPA (B.Tech)" },
  { value: 80.95, decimals: 2, suffix: "%", label: "Diploma Honors" },
  { value: 2, decimals: 0, suffix: "+", label: "Live Products Shipped" },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(aboutTabs[0].id);
  const [isPaused, setIsPaused] = useState(false);

  const activeContent = aboutTabs.find((t) => t.id === activeTab)!.content;

  useEffect(() => {
    if (!isInView || isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = aboutTabs.findIndex((t) => t.id === current);
        return aboutTabs[(currentIndex + 1) % aboutTabs.length].id;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isInView, isPaused]);

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-primary font-mono">01.</span>
            <h2 className="section-heading">About Me</h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="flex-1 h-px bg-gradient-to-r from-primary/60 via-border to-transparent max-w-xs"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Text Content */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Interactive tab switcher */}
              <div className="flex flex-wrap gap-1 mb-6 relative border-b border-border">
                {aboutTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-4 py-3 font-mono text-sm transition-colors duration-300 ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <motion.span
                          layoutId="about-active-indicator"
                          className="absolute left-0 right-0 -bottom-px h-[2px] bg-primary"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="min-h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    {activeContent}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 py-6 mt-2 border-y border-border">
                {stats.map((stat) => (
                  <Stat key={stat.label} {...stat} active={isInView} />
                ))}
              </div>

              <div className="flex items-center gap-4 pt-6">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-mono text-primary">Aligarh, India</span>
              </div>
            </div>

            {/* Highlights Cards */}
            <div className="space-y-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -6 }}
                  className="glass-card tilt-card p-6 rounded-2xl group hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  <div className="flex items-start gap-4 relative">
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <item.icon size={24} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stat = ({
  value,
  decimals,
  suffix,
  label,
  active,
}: {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  active: boolean;
}) => {
  const count = useCountUp(value, active);
  return (
    <div>
      <div className="text-3xl font-bold text-foreground font-mono">
        {count.toFixed(decimals)}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
};
