import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import { AnimatedDivider } from "@/components/portfolio/AnimatedDivider";

interface Certification {
  title: string;
  issuer: string;
  icon: string;
  description: string;
  link?: string;
}

const certifications: Certification[] = [
  {
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle",
    icon: "🧠",
    description: "Foundational concepts of agentic AI systems and autonomous reasoning workflows.",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4CE28E9BC55EDE791C11215E90B0476FF61CE49DA1D74DF5C47FD51D9A95A935",
  },
  {
    title: "5 Days AI Agent: Intensive Vibe Coding Course",
    issuer: "Google X Kaggle",
    icon: "⚡",
    description: "Rapid, hands-on intensive on building and deploying AI agents through vibe coding.",
    link: "https://drive.google.com/file/d/1TApXnzIcKL5RxiAo5Zpf0D45M3Kn7GMh/view?usp=sharing",
  },
  {
    title: "Machine Learning and Data Science",
    issuer: "Coding Blocks",
    icon: "🤖",
    description: "Core ML algorithms, data analysis, and model-building fundamentals.",
    link: "https://drive.google.com/file/d/1yoHqyuNsuALpaPaHceGtUNQIUaPhz1DA/view?usp=sharing",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    icon: "🔐",
    description: "Fundamentals of cybersecurity threats, defenses, and best practices.",
    link: "https://drive.google.com/file/d/1RQXLPLUoxsUBTPBiX2vPoJEPyNtvDv-m/view?usp=sharing",
  },
  {
    title: "Data Visualisation: Business Insights",
    issuer: "Tata Group X Forage",
    icon: "📊",
    description: "Translating raw data into actionable business insights through visualization.",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_zJpz49EB2RpyPSQap_1734802081207_completion_certificate.pdf",
  },
  {
    title: "Six Sigma White Belt",
    issuer: "Council For Six Sigma",
    icon: "🎯",
    description: "Process improvement fundamentals and quality management principles.",
    link: "https://drive.google.com/file/d/1thO0Rh95NHOflpxb-8XhFzkMYXzifc1G/view?usp=sharing",
  },
];

const achievements = [
  "Active participant in coding competitions and hackathons",
  "Strong problem-solving abilities demonstrated through practical projects",
  "Continuous learner with focus on emerging technologies",
];

export const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono">05.</span>
            <h2 className="section-heading">Certifications & Achievements</h2>
            <AnimatedDivider isInView={isInView} />
          </div>
          
          <p className="section-subheading mb-16">
            Professional certifications and notable achievements
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certifications.map((cert, index) => (
              <motion.a
                key={cert.title}
                href={cert.link}
                target={cert.link ? "_blank" : undefined}
                rel={cert.link ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`glass-card tilt-card rounded-2xl p-6 group hover:border-primary/40 transition-all duration-300 relative overflow-hidden block ${
                  cert.link ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl mb-4 relative inline-block"
                >
                  {cert.icon}
                </motion.div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors relative">
                  {cert.title}
                </h3>
                <p className="text-muted-foreground text-sm flex items-center gap-2 relative mb-2">
                  {cert.issuer}
                  {cert.link && (
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  )}
                </p>
                <p className="text-muted-foreground/70 text-xs leading-relaxed relative">
                  {cert.description}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-elevated rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Key Achievements</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">{achievement}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
