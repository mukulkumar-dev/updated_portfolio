import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Sparkles,
  Users,
  Building2,
  BookOpen,
  Newspaper,
  Home as HomeIcon,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedDivider } from "@/components/portfolio/AnimatedDivider";
import developerCommunityImg from "@/assets/developer_coomunity.png";
import employeeHubImg from "@/assets/employyehub.png";
import bookRecommendImg from "@/assets/book-recommend.png";
import eduverseImg from "@/assets/eduverse.png";
import holidayImg from "@/assets/holiday.png";
import elderCareImg from "@/assets/eldercare.png";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  period: string;
  icon: LucideIcon;
  image?: string;
  github?: string;
  live?: string;
}

const spotlightProject: Project = {
  title: "Elderly Care Assistant",
  description:
    "An ADK-powered intelligent orchestrator that manages daily schedules, medication tracking, wellness logs, and caregiver notifications with secure check gates.",
  technologies: ["Google ADK", "Python", "Gemini API", "MCP", "Multi-Agent Orchestration"],
  highlights: [
    "3-agent orchestration pipeline",
    "Built-in prompt-injection detection",
    "Human-in-the-loop caregiver approval",
  ],
  period: "2026",
  icon: Bot,
  image: elderCareImg,
  github: "https://github.com/mukulkumar-dev/elder-care-assistant",
  live: "https://github.com/mukulkumar-dev/elder-care-assistant",
};

const gridProjects: Project[] = [
  {
    title: "Online Community for Developers",
    description:
      "A full-stack developer-centric platform integrating project showcases, discussion forums, and event management. Increased user engagement by 50% through enhanced UI/UX.",
    technologies: ["Next.js", "MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "50% increase in user engagement",
      "40% increase in session duration",
      "35% boost in return visits",
    ],
    period: "April 2025 – May 2025",
    icon: Users,
    image: developerCommunityImg,
    github: "https://github.com/mukulkumar-dev/Developers_Community",
    live: "https://github.com/mukulkumar-dev/Developers_Community",
  },
  {
    title: "EmployeeHub - Online Boarding System",
    description:
      "Secure employee management platform with JWT-based roles, admin panel for unified management, and self-service tools for employees.",
    technologies: ["MongoDB", "React.js", "Node.js", "Express.js", "Framer Motion", "Tailwind CSS"],
    highlights: [
      "40% improved security with JWT",
      "25% operational efficiency increase",
      "60% employee engagement boost",
    ],
    period: "June 2025 – July 2025",
    icon: Building2,
    image: employeeHubImg,
    github: "https://github.com/mukulkumar-dev/Online_Boarding_System",
    live: "https://employeeehub.netlify.app/",
  },
];

const moreGridProjects: Project[] = [
  {
    title: "Book Recommendation System",
    description:
      "ML-based recommendation system with optimized data pipelines and interactive Streamlit UI. Achieved 20% accuracy boost over baseline models.",
    technologies: ["Scikit-Learn", "Pandas", "NumPy", "Streamlit", "Machine Learning"],
    highlights: [
      "60% reduction in data processing time",
      "20% accuracy improvement",
      "40% increased user engagement",
    ],
    period: "August 2024 – September 2024",
    icon: BookOpen,
    image: bookRecommendImg,
    github: "https://github.com/mukulkumar-dev/Book-Recommendation-System",
    live: "https://book-recommendation-system-vai56y73q9wyvkvavut6vk.streamlit.app/",
  },
  {
    title: "EduVerse Blogging Platform",
    description:
      "A full-stack blog application with secure authentication (JWT) and full CRUD functionality. Integrated real-time updates using Socket.io for enhanced content interaction.",
    technologies: ["MongoDB", "React.js", "Node.js", "Express.js", "Framer Motion", "Tailwind CSS", "Socket.io"],
    highlights: [
      "Secure JWT authentication",
      "45% improved content interaction",
      "35% boost in user retention",
    ],
    period: "January 2025 – March 2025",
    icon: Newspaper,
    image: eduverseImg,
    github: "https://github.com/mukulkumar-dev/EduVerse",
    live: "https://github.com/mukulkumar-dev/EduVerse",
  },
  {
    title: "Holiday HomeStays",
    description:
      "A modern vacation rental platform featuring dynamic property listings, intuitive search filters, and seamless booking experiences. Built with a focus on responsive design and smooth animations for an immersive user journey.",
    technologies: ["React.js", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Responsive UI design",
      "Dynamic property listings",
      "Smooth user experience",
    ],
    period: "2024",
    icon: HomeIcon,
    image: holidayImg,
    github: "https://github.com/mukulkumar-dev/Holiday-Homes",
    live: "https://github.com/mukulkumar-dev/Holiday-Homes",
  },
];

function parseStat(highlight: string) {
  const match = highlight.match(/^(\d+%|\d+)\s+/);
  if (!match) return { value: null, label: highlight };
  return { value: match[1], label: highlight.slice(match[0].length) };
}

const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="flex items-center gap-3">
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400 }}
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-center w-10 h-10 rounded-full glass-card text-foreground hover:text-primary hover:border-primary/50 transition-colors"
      aria-label="View source on GitHub"
    >
      <Github size={18} />
    </motion.a>
    <motion.a
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400 }}
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-center w-10 h-10 rounded-full glass-card text-foreground hover:text-primary hover:border-primary/50 transition-colors"
      aria-label="View live demo"
    >
      <ExternalLink size={18} />
    </motion.a>
  </div>
);

const SpotlightCard = ({ project, isInView }: { project: Project; isInView: boolean }) => {
  const Icon = project.icon;
  const stats = project.highlights.map(parseStat);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="project-card tilt-card rounded-3xl overflow-hidden grid lg:grid-cols-12 mb-8"
    >
      {/* Visual */}
      <div className="lg:col-span-6 relative aspect-video lg:aspect-auto overflow-hidden group">
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-accent/15 to-transparent" />
            <div className="absolute inset-0 animated-grid opacity-60" />
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 4 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="w-28 h-28 rounded-3xl glass-card flex items-center justify-center"
              >
                <Icon className="w-12 h-12 text-primary" />
              </motion.div>
            </div>
          </>
        )}
        {/* Legibility gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-background/30" />
        {/* Shine sweep */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        {/* Badge */}
        <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          Featured Project
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-6 p-8 md:p-10 flex flex-col justify-center">
        <p className="text-primary font-mono text-sm mb-2">{project.period}</p>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="rounded-xl bg-secondary/60 border border-border px-3 py-3"
            >
              {stat.value && (
                <p className="text-xl font-bold text-gradient font-heading">{stat.value}</p>
              )}
              <p className="text-xs text-muted-foreground leading-snug mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <ProjectLinks project={project} />
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className="group flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            View project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) => {
  const Icon = project.icon;
  const altAccent = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="project-card tilt-card rounded-2xl overflow-hidden group flex flex-col h-full"
    >
      {/* Visual */}
      <div className="relative aspect-video overflow-hidden">
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                altAccent ? "from-accent/25 via-primary/10" : "from-primary/25 via-accent/10"
              } to-transparent`}
            />
            <div className="absolute inset-0 animated-grid opacity-40" />
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
              >
                <Icon className="w-7 h-7 text-primary" />
              </motion.div>
            </div>
          </>
        )}
        {/* Legibility gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/40" />
        <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

        {/* Hover link overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full glass-card text-foreground hover:text-primary hover:border-primary/50 transition-colors"
            aria-label="View source on GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full glass-card text-foreground hover:text-primary hover:border-primary/50 transition-colors"
            aria-label="View live demo"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        <span className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-sm text-[11px] font-mono text-muted-foreground border border-border">
          {project.period}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.highlights.slice(0, 2).map((highlight) => (
            <span
              key={highlight}
              className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-5 mt-auto">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="text-muted-foreground font-mono text-xs">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-muted-foreground/70 font-mono text-xs">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          View project
          <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      {/* Background */}
      <div
        className="absolute inset-0 hero-glow opacity-20"
        style={{ top: "10%", right: "0", transform: "translateX(50%)" }}
      />
      <div
        className="absolute inset-0 hero-glow opacity-10"
        style={{ bottom: "0%", left: "0", transform: "translateX(-50%)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono">04.</span>
            <h2 className="section-heading">Featured Projects</h2>
            <AnimatedDivider isInView={isInView} />
          </div>

          <p className="section-subheading mb-16">
            Some things I've built that showcase my skills and passion
          </p>
        </motion.div>

        <SpotlightCard project={spotlightProject} isInView={isInView} />

        <div className="grid md:grid-cols-2 gap-6">
          {gridProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
          ))}

          <AnimatePresence>
            {showMore &&
              moreGridProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={gridProjects.length + index}
                  isInView={true}
                />
              ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center pt-12"
        >
          <Button
            onClick={() => setShowMore((prev) => !prev)}
            variant="outline"
            size="lg"
            className="magnetic-btn group border-primary/50 hover:border-primary hover:bg-primary/10 transition-colors duration-300"
          >
            <span className="mr-2">{showMore ? "Show Less" : "See More Projects"}</span>
            {showMore ? (
              <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            ) : (
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
