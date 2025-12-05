import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo/Name */}
            <motion.a
              href="#home"
              className="font-display text-xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Portfolio
            </motion.a>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {currentYear} Ayush Khati. Built with{" "}
              <Heart size={14} className="text-destructive fill-destructive" />
            </p>

            {/* Back to top */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              Back to top ↑
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
