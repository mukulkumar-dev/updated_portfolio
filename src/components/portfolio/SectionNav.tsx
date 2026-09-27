import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "coding-profiles", label: "Coding Profiles" },
  { id: "contact", label: "Contact" },
];

export const SectionNav = () => {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="absolute top-1 bottom-1 left-1/2 -translate-x-1/2 w-px bg-border -z-10" />
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={label}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center justify-center py-1"
            >
              <span className="absolute right-full mr-4 whitespace-nowrap text-xs font-mono uppercase tracking-wider opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-muted-foreground group-hover:text-primary pointer-events-none">
                {label}
              </span>
              <motion.span
                className="relative z-10 block w-2.5 h-2.5 rounded-full border-2 bg-background"
                animate={{
                  scale: isActive ? 1.4 : 1,
                  borderColor: isActive
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground) / 0.4)",
                  backgroundColor: isActive
                    ? "hsl(var(--primary))"
                    : "hsl(var(--background))",
                }}
                transition={{ duration: 0.3 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="section-nav-glow"
                    className="absolute inset-0 rounded-full bg-primary/50 blur-md -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
