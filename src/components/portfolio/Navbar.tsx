import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import mukulLogo from "@/assets/mukul-logo.png";

const RESUME_URL =
  "https://drive.google.com/file/d/1jQfwqW5Y8K2DwWGqtnH8nSLoAznJu3BF/view?usp=sharing";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#coding-profiles", label: "Coding" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={mukulLogo}
              alt="Mukul Kumar logo"
              className="h-10 w-auto object-contain invert drop-shadow-[0_0_10px_hsl(var(--primary)/0.4)]"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <span className="text-primary font-mono text-xs mr-1">0{index + 1}.</span>
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link text-sm font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-primary font-mono text-xs mr-2">0{index + 1}.</span>
                  {link.label}
                </a>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
