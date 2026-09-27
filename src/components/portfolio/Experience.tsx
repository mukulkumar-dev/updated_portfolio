import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, ChevronRight } from "lucide-react";
import { AnimatedDivider } from "@/components/portfolio/AnimatedDivider";

type Project = {
  name: string;
  subtitle: string;
  points: string[];
};

type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  projects?: Project[];
  highlights?: string[];
  technologies: string[];
};

const experiences: ExperienceItem[] = [
  {
    id: "jungleworks",
    company: "JungleWorks",
    role: "Associate Software Engineer",
    location: "Chandigarh, India",
    period: "Sept 2025 – Present",
    description:
      "Working on scalable web and mobile products with focus on performance, product growth, and user experience.",
    projects: [
      {
        name: "Rivia.ai",
        subtitle: "B2B Interactive Product Demo Platform",
        points: [
          "Built end-to-end Demos, Tours, Banners, Product Management, and Workspace modules using React.js, Next.js, and TypeScript",
          "Integrated Stripe Billing to support reliable subscription and payment workflows based on customer requirements",
          "Developed a Vanilla JavaScript browser extension with DOM-based screen capture and interactive UI for delivering Demos and Tours",
          "Optimized frontend performance by ~35% and redesigned interactive UI components to improve user experience",
          "Optimized API workflows and route-level data fetching, reducing timeouts and ensuring accurate, efficient data delivery",
        ],
      },
      {
        name: "Benny",
        subtitle: "AI Fashion App",
        points: [
          "Built an Instagram LTK-style creator content pipeline using Flutter, AWS Lambda, event triggers, and Firestore to process and display creator Reels",
          "Implemented Redis caching + semantic embeddings for Search/Google Shopping APIs, improving product retrieval and reducing API costs by ~40%",
          "Integrated US & Indian affiliate networks to enable scalable product monetization and affiliate tracking",
          "Integrated AppsFlyer & Branch.io for click attribution, deep linking, and user performance analytics",
          "Optimized application workflows and backend architecture, delivering 70–80% performance improvements and enhanced UX",
        ],
      },
    ],
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Stripe",
      "Flutter",
      "AWS Lambda",
      "Firestore",
      "Redis",
    ],
  },
  {
    id: "bluestock",
    company: "Bluestock Fintech",
    role: "Software Development Engineer Intern",
    location: "Remote, India",
    period: "Jan 2025 – Feb 2025",
    description: "Fintech Company - User Management & Stock Insights Platform",
    highlights: [
      "Developed a User Management Dashboard with real-time stock insights and role-based access control, improving data security by 40%",
      "Optimized API calls and database queries, reducing server response time by 50% and enhancing system efficiency",
      "Built a scalable, responsive UI using Next.js and Tailwind CSS, improving page load speed by 30% and user engagement by 25%",
    ],
    technologies: ["Next.js", "Tailwind CSS", "REST APIs", "Database Optimization"],
  },
  {
    id: "gla",
    company: "Coding Blocks X GLA University",
    role: "Python ML & Data Science Trainee",
    location: "Remote, India",
    period: "June 2024 – July 2024",
    description: "Job-Oriented Value-Added Course",
    highlights: [
      "Analyzed datasets using Pandas, NumPy, and Matplotlib, improving data processing efficiency by 50%",
      "Built and deployed ML models with an accuracy of 85%, demonstrating proficiency in predictive analytics",
    ],
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(experiences[0].id);
  const [projectIndex, setProjectIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeExperience = experiences.find((e) => e.id === activeTab)!;
  const projects = activeExperience.projects;

  useEffect(() => {
    setProjectIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (!projects || projects.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % projects.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [projects, isPaused]);

  useEffect(() => {
    if (!isInView || isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = experiences.findIndex((e) => e.id === current);
        return experiences[(currentIndex + 1) % experiences.length].id;
      });
    }, 8000);
    return () => clearInterval(timer);
  }, [isInView, isPaused]);

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono">03.</span>
            <h2 className="section-heading">Experience</h2>
            <AnimatedDivider isInView={isInView} />
          </div>
          
          <p className="section-subheading mb-16">
            Where I've worked and gained valuable experience
          </p>

          <div
            className="grid lg:grid-cols-[250px_1fr] gap-8 max-w-4xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Tab Navigation */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 relative">
              {experiences.map((exp) => {
                const isActive = activeTab === exp.id;
                return (
                  <motion.button
                    key={exp.id}
                    onClick={() => setActiveTab(exp.id)}
                    whileHover={{ x: 4 }}
                    className={`relative px-6 py-4 text-left whitespace-nowrap font-mono text-sm border-b-2 lg:border-b-0 lg:border-l-2 transition-all duration-300 ${
                      isActive
                        ? "border-primary text-primary bg-primary/5"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground hover:bg-muted/30"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="exp-active-indicator"
                        className="absolute inset-0 bg-primary/10 rounded-r-md -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {exp.company}
                  </motion.button>
                );
              })}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[300px]"
            >
              <h3 className="text-xl font-semibold mb-1">
                {activeExperience.role}{" "}
                <span className="text-primary">@ {activeExperience.company}</span>
              </h3>
              
              <p className="font-mono text-muted-foreground text-sm mb-2">
                {activeExperience.period}
              </p>
              
              <p className="text-muted-foreground mb-6">
                {activeExperience.location} • {activeExperience.description}
              </p>

              {projects ? (
                <div className="mb-8 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={projects[projectIndex].name}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <h4 className="text-lg font-semibold mb-3">
                        <span className="text-primary">{projects[projectIndex].name}</span>
                        <span className="text-muted-foreground font-normal">
                          {" "}
                          – {projects[projectIndex].subtitle}
                        </span>
                      </h4>
                      <ul className="space-y-3 pl-1">
                        {projects[projectIndex].points.map((point, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.08 }}
                            className="flex items-start gap-3 group"
                          >
                            <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                              {point}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>

                  {projects.length > 1 && (
                    <div className="flex items-center gap-2 mt-6">
                      {projects.map((project, i) => (
                        <button
                          key={project.name}
                          onClick={() => setProjectIndex(i)}
                          aria-label={`Show ${project.name}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === projectIndex
                              ? "w-8 bg-primary"
                              : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <ul className="space-y-4 mb-8">
                  {activeExperience.highlights?.map((highlight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 group"
                    >
                      <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              )}

              <div>
                <p className="text-xs font-mono text-primary uppercase tracking-wider mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {activeExperience.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-mono cursor-default hover:bg-primary/20 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="text-primary font-mono text-base">03.1</span>
              Education
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6 hover:border-primary/40 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">B.Tech in Computer Science</h4>
                    <p className="text-primary">GLA University, Mathura</p>
                  </div>
                  <span className="text-primary font-mono text-2xl font-bold">8.2</span>
                </div>
                <p className="text-muted-foreground text-sm font-mono">August 2023 – Present</p>
              </div>
              
              <div className="glass-card rounded-2xl p-6 hover:border-primary/40 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">Diploma in CS Engineering</h4>
                    <p className="text-primary">MMIT (Honors)</p>
                  </div>
                  <span className="text-gradient-accent font-mono text-2xl font-bold">80.95%</span>
                </div>
                <p className="text-muted-foreground text-sm font-mono">August 2020 – May 2023</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
