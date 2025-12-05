import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "./ParticleBackground";
import { TextReveal } from "./TextReveal";
import { MagneticButton } from "./MagneticButton";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useRef } from "react";

/**
 * Key changes:
 * - All animated backgrounds (gradient + orbs + particles) are in ONE wrapper (.bg-composite)
 *   so the browser can promote them into a single GPU/composited layer.
 * - The glass card has explicit GPU promotion (translateZ(0), will-change) to isolate it.
 * - Moved the animated orbs INTO the composite background wrapper (they previously were separate).
 * - Replaced JS-driven backgroundPosition animate for the role text (use CSS animation added to globals).
 */

export const HeroSection = () => {
  const ref = useRef(null);
  const { toast } = useToast();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // render particles once
  const particleLayer = useMemo(() => <ParticleBackground />, []);

  const handleResumeDownload = () => {
    toast({
      title: "Resume Downloaded!",
      description: "Thank you for downloading my resume.",
    });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden transform-gpu"
      style={{ position: "relative" }}
    >
      {/* COMBINED BACKGROUND - single GPU composited layer */}
      <div
        className="absolute inset-0 -z-10 bg-composite"
        style={{ transform: "translateZ(0)", willChange: "transform", backfaceVisibility: "hidden", pointerEvents: "none" }}
      >
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-hero-gradient" />

        {/* animated orbs now inside same composite wrapper (will-change: transform only) */}
        <div className="absolute inset-0">
          <motion.div
            aria-hidden
            className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-primary/20 rounded-full blur-[100px] sm:blur-[120px]"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-accent/20 rounded-full blur-[100px] sm:blur-[120px]"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
          />
          <motion.div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-primary/5 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ willChange: "transform" }}
          />
        </div>

        {/* Particle canvas inserted into the same composite wrapper */}
        {particleLayer}
      </div>

      {/* Grid Pattern (static) */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(222_30%_18%/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(222_30%_18%/0.3)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none" />

      {/* Foreground content. Promote to its own layer so it doesn't repaint when the background animates */}
      <motion.div
        viewport={{ once: true }}
        style={{ y, transform: "translateZ(0)", willChange: "opacity, transform", backfaceVisibility: "hidden" }}
        className="container relative z-10 px-4 md:px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 sm:mb-8"
            style={{ transform: "translateZ(0)", willChange: "transform, opacity" }}
          >
            <motion.span
              viewport={{ once: true }}
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ willChange: "transform" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              Available for work
            </span>
          </motion.div>

          {/* Main Heading with Text Reveal */}
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-4 sm:mb-6"
          >
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <TextReveal text="Hi, I'm" className="block sm:inline" />
              <motion.span
                viewport={{ once: true }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                className="gradient-text block sm:inline sm:ml-3"
              >
                Ayush Khati
              </motion.span>
            </h1>
          </motion.div>

          
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance px-4">
              <span className="gradient-text-animate">
                Full Stack Developer
              </span>{" "}
              crafting beautiful, performant, and user-centric digital experiences
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4"
          >
            <MagneticButton className="w-full sm:w-auto">
              <Button
                variant="hero"
                size="lg"
                onClick={() => scrollToSection("#projects")}
                className="w-full sm:w-auto group"
              >
                <span className="relative z-10">View My Work</span>
                <motion.div
                  viewport={{ once: true }}
                  className="absolute inset-0 bg-accent/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="button-bg"
                />
              </Button>
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto">
              <Button
                variant="hero-outline"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <a 
                  href="/ayushkhati.pdf" 
                  download="Ayush_Khati_Resume.pdf"
                  onClick={handleResumeDownload}
                >
                  <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Download Resume
                </a>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-3 sm:gap-4"
          >
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:your@email.com", label: "Email" },
            ].map((social, index) => (
              <MagneticButton key={social.label}>
                <motion.a
                  viewport={{ once: true }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-card text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 block"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} className="sm:w-5 sm:h-5" />
                </motion.a>
              </MagneticButton>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={() => scrollToSection("#about")}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <motion.div
            viewport={{ once: true }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
            style={{ willChange: "transform" }}
          >
            <span className="text-xs font-medium hidden sm:block">Scroll</span>
            <ArrowDown size={20} className="sm:w-6 sm:h-6" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};
