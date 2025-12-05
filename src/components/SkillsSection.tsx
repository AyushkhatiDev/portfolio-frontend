import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Vue.js", level: 80 },
    ],
  },
  {
    title: "Backend",
    icon: "⚡",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 85 },
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "GraphQL", level: 82 },
    ],
  },
  {
    title: "Tools & Others",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 95 },
      { name: "Docker", level: 80 },
      { name: "AWS", level: 78 },
      { name: "Figma", level: 85 },
      { name: "CI/CD", level: 82 },
    ],
  },
];

const technologies = [
  "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Node.js",
  "Express", "Python", "Django", "FastAPI", "PostgreSQL", "MongoDB",
  "Redis", "GraphQL", "REST APIs", "Docker", "Kubernetes", "AWS",
  "Git", "GitHub Actions", "Jest", "Cypress", "Tailwind", "Sass",
  "Figma", "Framer Motion", "Three.js", "WebGL",
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="container relative z-10 px-4 md:px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="inline-block text-primary font-medium text-sm tracking-wider uppercase mb-4 px-4 py-1 rounded-full bg-primary/10"
            >
              Expertise
            </motion.span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Skills & <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto px-4">
              My technical toolkit spans the entire development spectrum
            </p>
          </motion.div>

          {/* Skills Progress Bars */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-20">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="glass-card p-4 sm:p-6 rounded-2xl group hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: categoryIndex * 0.3 }}
                    className="text-xl sm:text-2xl"
                  >
                    {category.icon}
                  </motion.span>
                  <h3 className="font-display text-lg sm:text-xl font-semibold gradient-text">
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      className="cursor-pointer"
                    >
                      <div className="flex justify-between mb-1.5 sm:mb-2">
                        <span className="text-xs sm:text-sm font-medium">{skill.name}</span>
                        <motion.span
                          className="text-xs sm:text-sm text-muted-foreground"
                          animate={{
                            scale: hoveredSkill === skill.name ? 1.1 : 1,
                            color: hoveredSkill === skill.name ? "hsl(187 80% 55%)" : undefined,
                          }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary-gradient rounded-full relative"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.1 + index * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <motion.div
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full"
                            animate={{
                              boxShadow: hoveredSkill === skill.name
                                ? "0 0 10px hsl(187 80% 55%)"
                                : "none",
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technology Tags Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h3 className="font-display text-lg sm:text-xl font-semibold mb-6 sm:mb-8">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.02 }}
                  whileHover={{
                    scale: 1.15,
                    y: -4,
                    boxShadow: "0 10px 20px -10px hsl(187 80% 55% / 0.3)",
                  }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card text-xs sm:text-sm font-medium hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
