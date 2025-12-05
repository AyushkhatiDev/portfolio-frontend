import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "./MagneticButton";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "nav-blur border-b border-border/50" : ""
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <MagneticButton>
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#home");
                }}
                className="font-display text-lg sm:text-xl md:text-2xl font-bold gradient-text cursor-pointer flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Portfolio
              </motion.a>
            </MagneticButton>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 lg:px-4 py-2 text-sm font-medium transition-colors relative group ${
                    activeSection === item.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-1/2 h-0.5 bg-primary rounded-full"
                    initial={{ width: 0, x: "-50%" }}
                    animate={{
                      width: activeSection === item.href.slice(1) ? "100%" : 0,
                      x: "-50%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary/50 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <MagneticButton>
                  <Button
                    variant="hero"
                    size="sm"
                    onClick={() => scrollToSection("#contact")}
                    className="ml-2 lg:ml-4"
                  >
                    Hire Me
                  </Button>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-9 h-9"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-14 sm:top-16 bottom-0 w-[280px] z-40 md:hidden nav-blur border-l border-border/50"
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex flex-col gap-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className={`px-4 py-3 text-base font-medium rounded-lg transition-colors text-left flex items-center gap-3 ${
                        activeSection === item.href.slice(1)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <motion.span
                        className={`w-2 h-2 rounded-full ${
                          activeSection === item.href.slice(1) ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                        animate={{
                          scale: activeSection === item.href.slice(1) ? [1, 1.3, 1] : 1,
                        }}
                        transition={{ duration: 0.5, repeat: activeSection === item.href.slice(1) ? Infinity : 0 }}
                      />
                      {item.label}
                    </motion.button>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4"
                >
                  <Button
                    variant="hero"
                    onClick={() => scrollToSection("#contact")}
                    className="w-full"
                  >
                    Hire Me
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
