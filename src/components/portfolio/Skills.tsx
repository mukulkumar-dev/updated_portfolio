import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import {
  Braces,
  Layers,
  Server,
  Database,
  BrainCircuit,
  Cloud,
  Wrench,
  Cpu,
  KeyRound,
  Network,
  ShieldCheck,
  Waypoints,
  Zap,
  ThumbsUp,
  Shapes,
  Sparkles,
  Bot,
  Workflow,
  Terminal,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import {
  SiC,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTailwindcss,
  SiBootstrap,
  SiMui,
  SiFramer,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiJsonwebtokens,
  SiSocketdotio,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiCloudinary,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiGooglegemini,
  SiLangchain,
  SiVercel,
  SiNetlify,
  SiRender,
  SiDigitalocean,
  SiGooglecloud,
  SiStreamlit,
  SiDocker,
  SiGithubactions,
  SiGit,
  SiGithub,
  SiPostman,
  SiGitlab,
  SiBitbucket,
  SiJupyter,
  SiKaggle,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { AnimatedDivider } from "@/components/portfolio/AnimatedDivider";
import { CountUp } from "@/components/portfolio/CountUp";

type SkillIcon = ComponentType<{ className?: string; style?: CSSProperties }>;

interface Skill {
  name: string;
  icon: SkillIcon;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  proficiency: number;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Braces,
    proficiency: 92,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "Java", icon: FaJava, color: "#F89820" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#1572B6" },
    ],
  },
  {
    title: "Frontend Development",
    icon: Layers,
    proficiency: 95,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Angular.js", icon: SiAngular, color: "#DD0031" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "Material UI", icon: SiMui, color: "#007FFF" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    proficiency: 90,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "REST APIs", icon: Network, color: "#22D3EE" },
      { name: "JWT Authentication", icon: SiJsonwebtokens, color: "#FB015B" },
      { name: "OAuth", icon: KeyRound, color: "#FBBF24" },
      { name: "Socket.IO / WebSockets", icon: SiSocketdotio, color: "#25C2A0" },
      { name: "Python Flask", icon: SiFlask, color: "#FFFFFF" },
    ],
  },
  {
    title: "Databases & Storage",
    icon: Database,
    proficiency: 87,
    color: "from-teal-500 to-cyan-500",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MongoDB Atlas", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Cloudinary", icon: SiCloudinary, color: "#4C63D2" },
      { name: "AWS S3", icon: Database, color: "#FF9900" },
      { name: "API Gateway", icon: Waypoints, color: "#FF9900" },
      { name: "EventBridge", icon: Zap, color: "#FF9900" },
      { name: "IAM Role", icon: ShieldCheck, color: "#FF9900" },
    ],
  },
  {
    title: "AI / Machine Learning",
    icon: BrainCircuit,
    proficiency: 88,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Python for ML", icon: SiPython, color: "#3776AB" },
      { name: "NumPy", icon: SiNumpy, color: "#4DABCF" },
      { name: "Pandas", icon: SiPandas, color: "#8B7FD1" },
      { name: "Matplotlib", icon: BarChart3, color: "#60A5FA" },
      { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "Machine Learning", icon: Cpu, color: "#22D3EE" },
      { name: "Recommendation Systems", icon: ThumbsUp, color: "#FBBF24" },
      { name: "Classification Models", icon: Shapes, color: "#A78BFA" },
      { name: "Generative AI", icon: Sparkles, color: "#F472B6" },
      { name: "Gemini API", icon: SiGooglegemini, color: "#8E75FF" },
      { name: "AI Chatbots", icon: Bot, color: "#34D399" },
      { name: "LangChain", icon: SiLangchain, color: "#65D6AD" },
      { name: "Agentic AI", icon: Workflow, color: "#38BDF8" },
    ],
  },
  {
    title: "Cloud / Deployment",
    icon: Cloud,
    proficiency: 85,
    color: "from-sky-500 to-indigo-500",
    skills: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
      { name: "Render", icon: SiRender, color: "#46E3B7" },
      { name: "DigitalOcean", icon: SiDigitalocean, color: "#0080FF" },
      { name: "Google Cloud Platform", icon: SiGooglecloud, color: "#4285F4" },
      { name: "Streamlit Deployment", icon: SiStreamlit, color: "#FF4B4B" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "GitHub Actions / CI-CD", icon: SiGithubactions, color: "#2088FF" },
    ],
  },
  {
    title: "Development Tools",
    icon: Wrench,
    proficiency: 90,
    color: "from-slate-500 to-gray-600",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "GitLab", icon: SiGitlab, color: "#FC6D26" },
      { name: "BitBucket", icon: SiBitbucket, color: "#0052CC" },
      { name: "Jupyter Notebook", icon: SiJupyter, color: "#F37626" },
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Antigravity IDE", icon: Terminal, color: "#94A3B8" },
      { name: "Kaggle Notebook", icon: SiKaggle, color: "#20BEFF" },
    ],
  },
];

const AUTOPLAY_MS = 5000;

interface OrbitRingProps {
  skills: Skill[];
  radius: number;
  duration: number;
  clockwise: boolean;
}

const OrbitRing = ({ skills, radius, duration, clockwise }: OrbitRingProps) => (
  <motion.div
    className="absolute inset-0"
    animate={{ rotate: clockwise ? 360 : -360 }}
    transition={{ duration, repeat: Infinity, ease: "linear" }}
  >
    {skills.map((skill, i) => {
      const angle = (360 / skills.length) * i;
      const rad = (angle * Math.PI) / 180;
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);
      const Icon = skill.icon;

      return (
        <div
          key={skill.name}
          className="absolute top-1/2 left-1/2"
          style={{ transform: `translate(${x}px, ${y}px)` }}
        >
          {/* Static centering wrapper — must stay a plain element so Framer
           * Motion's `animate` on the child below (which writes its own
           * literal `transform`) can't clobber this translate. */}
          <div className="-translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="group/icon relative"
              animate={{ rotate: clockwise ? -360 : 360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.3, zIndex: 30 }}
            >
              <div
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full glass-card flex items-center justify-center cursor-default transition-shadow duration-300"
                style={{ boxShadow: `0 0 0 1px hsl(var(--border)), 0 8px 18px -6px ${skill.color}66` }}
              >
                <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" style={{ color: skill.color }} />
              </div>
              <span className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-background/90 border border-border px-2 py-0.5 text-[10px] font-mono text-foreground opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 z-30">
                {skill.name}
              </span>
            </motion.div>
          </div>
        </div>
      );
    })}
  </motion.div>
);

/** Distributes skills across 1-3 concentric rings depending on count, so a
 * category never renders an oddly sparse or overcrowded ring. */
function buildRings(skills: Skill[]): Skill[][] {
  const ringCount = skills.length > 9 ? 3 : skills.length > 5 ? 2 : 1;
  const perRing = Math.ceil(skills.length / ringCount);
  const rings: Skill[][] = [];
  for (let i = 0; i < ringCount; i++) {
    const chunk = skills.slice(i * perRing, (i + 1) * perRing);
    if (chunk.length) rings.push(chunk);
  }
  return rings;
}

const SkillOrbit = ({ category }: { category: SkillCategory }) => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [orbitSize, setOrbitSize] = useState(400);
  const HubIcon = category.icon;

  useEffect(() => {
    function handleResize() {
      if (orbitRef.current) setOrbitSize(orbitRef.current.offsetWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rings = useMemo(() => buildRings(category.skills), [category]);
  const minRadius = orbitSize * 0.22;
  const maxRadius = orbitSize * 0.48;

  return (
    <div ref={orbitRef} className="relative w-full max-w-[420px] aspect-square mx-auto">
      {rings.map((ringSkills, i) => {
        const radius =
          rings.length === 1 ? maxRadius : minRadius + ((maxRadius - minRadius) * i) / (rings.length - 1);
        const duration = 16 + i * 8;
        const clockwise = i % 2 === 0;

        return (
          <Fragment key={i}>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/40"
              style={{ width: radius * 2, height: radius * 2 }}
            />
            <OrbitRing skills={ringSkills} radius={radius} duration={duration} clockwise={clockwise} />
          </Fragment>
        );
      })}

      {/* Center hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          key={category.title}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full glass-card flex flex-col items-center justify-center text-center px-2 shadow-[0_0_30px_-8px_hsl(var(--primary)/0.5)]"
        >
          <HubIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-1" />
          <span className="text-[10px] sm:text-[11px] font-semibold leading-tight px-1">{category.title}</span>
          <span className="text-primary font-mono text-[10px] mt-0.5">{category.proficiency}%</span>
        </motion.div>
      </div>
    </div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skillCategories.length);
    }, AUTOPLAY_MS);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  const selectCategory = (index: number) => {
    setActiveIndex(index);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const activeCategory = skillCategories[activeIndex];

  return (
    <section id="skills" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 hero-glow opacity-30" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono">02.</span>
            <h2 className="section-heading">Skills & Technologies</h2>
            <AnimatedDivider isInView={isInView} />
          </div>

          <p className="section-subheading mb-16">
            Technologies I've been working with recently
          </p>

          {/* Orbit showcase */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center mb-20">
            {/* Left: category list with proficiency */}
            <div className="lg:col-span-5 lg:order-1 space-y-3">
              {skillCategories.map((category, index) => {
                const CategoryIcon = category.icon;
                const isActive = index === activeIndex;
                return (
                  <motion.button
                    key={category.title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    onClick={() => selectCategory(index)}
                    className={`w-full text-left rounded-2xl p-4 sm:p-5 border transition-colors duration-300 relative overflow-hidden ${
                      isActive
                        ? "border-primary/50 bg-primary/5"
                        : "border-border hover:border-primary/30 bg-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.color} transition-opacity duration-300 ${
                            isActive ? "opacity-100" : "opacity-60"
                          }`}
                        >
                          <CategoryIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h3 className={`font-semibold truncate transition-colors ${isActive ? "text-primary" : ""}`}>
                            {category.title}
                          </h3>
                          <p className="text-xs text-muted-foreground font-mono">
                            {category.skills.length} technologies
                          </p>
                        </div>
                      </div>
                      <span className="flex-shrink-0 text-primary font-mono text-sm">
                        {category.proficiency}%
                      </span>
                    </div>

                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-3">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${category.proficiency}%` } : {}}
                        transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: "easeOut" }}
                      />
                    </div>

                    <p
                      className={`text-xs text-muted-foreground font-mono leading-relaxed transition-all duration-300 ${
                        isActive ? "opacity-100 max-h-28" : "opacity-0 max-h-0 overflow-hidden"
                      }`}
                    >
                      {category.skills.map((s) => s.name).join(" · ")}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Right: orbiting skill icons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 lg:order-2"
            >
              <SkillOrbit category={activeCategory} />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: 35, decimals: 0, suffix: "%", label: "Higher User Adoption" },
            { value: 85, decimals: 0, suffix: "%", label: "ML Model Accuracy" },
            { value: 50, decimals: 0, suffix: "%", label: "Engagement Increase" },
            { value: 8.2, decimals: 1, suffix: "", label: "Current CPI" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1, type: "spring" }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="text-center cursor-default"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2 drop-shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                <CountUp
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  isInView={isInView}
                  delay={0.7 + index * 0.1}
                />
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
