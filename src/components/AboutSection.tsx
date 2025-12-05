import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Rocket, Users, Zap, Shield } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code",
    color: "from-primary to-cyan-400",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive and visually stunning interfaces",
    color: "from-accent to-purple-400",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing for speed and seamless user experience",
    color: "from-orange-500 to-rose-500",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively with teams and stakeholders",
    color: "from-emerald-500 to-teal-400",
  },
];

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "5+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "99%", label: "Client Satisfaction" },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="about"
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
      style={{ position: "relative" }}
      ref={containerRef}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      {/* Floating shapes */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-10 w-32 h-32 sm:w-64 sm:h-64 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 left-10 w-48 h-48 sm:w-80 sm:h-80 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="container relative z-10 px-4 md:px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4 px-4 py-1 rounded-full bg-primary/10"
            >
              About Me
            </motion.span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Passionate About Creating
              <br />
              <span className="gradient-text">Digital Excellence</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-square max-w-sm sm:max-w-md mx-auto">
                {/* Decorative elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-3xl border-2 border-dashed border-primary/20"
                />
                <div className="absolute inset-4 rounded-2xl glass-card overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4 sm:p-8">
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-primary-gradient p-1"
                      >
                        <img 
                          src="/profile.jpg" 
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 glass-card px-3 py-1.5 sm:px-4 sm:py-2 rounded-full"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3 text-primary" />
                    3+ Years Exp
                  </span>
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 glass-card px-3 py-1.5 sm:px-4 sm:py-2 rounded-full"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    <Shield className="w-3 h-3 text-accent" />
                    3+ Projects
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                I'm a passionate full-stack developer with a keen eye for design and a love for creating seamless user experiences. With expertise in modern web technologies, I transform ideas into powerful digital solutions.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Currently working as a <span className="text-primary font-semibold">Junior Software Developer</span> at{" "}
                <a 
                  href="https://www.udeckservices.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors underline decoration-primary/30 hover:decoration-accent"
                >
                  Udeck IT Services Private Limited
                </a>
                , where I contribute to building innovative software solutions.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                My journey in tech started with curiosity and has evolved into a career dedicated to pushing the boundaries of what's possible on the web.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="text-center p-3 sm:p-4 rounded-xl glass-card"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                      className="block text-xl sm:text-2xl font-bold gradient-text"
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {highlights.map((item, index) => (
                  <MagneticButton key={item.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="group p-3 sm:p-4 rounded-xl glass-card hover:border-primary/30 transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`p-2 rounded-lg bg-gradient-to-br ${item.color} text-white`}
                        >
                          <item.icon size={18} />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold mb-1 text-sm sm:text-base">{item.title}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </MagneticButton>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
