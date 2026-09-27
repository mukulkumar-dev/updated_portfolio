import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Certifications } from "@/components/portfolio/Certifications";
import { CodingProfiles } from "@/components/portfolio/CodingProfiles";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { SectionNav } from "@/components/portfolio/SectionNav";
import { Preloader } from "@/components/portfolio/Preloader";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoaded = useCallback(() => setIsLoading(false), []);

  // Always start at the top of the home page on load/refresh: stop the browser restoring
  // the previous scroll position and drop any section hash (e.g. #contact) from the URL.
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoading) window.scrollTo(0, 0);
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <AnimatePresence>{isLoading && <Preloader onComplete={handleLoaded} />}</AnimatePresence>

      {/* Mounted as the curtain lifts, so the hero's entrance animations play in view */}
      {!isLoading && (
        <>
          <AnimatedBackground />
          <CursorGlow />
          <ScrollProgress />
          <SectionNav />
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <CodingProfiles />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
