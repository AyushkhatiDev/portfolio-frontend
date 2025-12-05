import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "./MagneticButton";

const projects = [
  {
    title: "Fluentra — Language Exchange Platform",
    description:
      "Real-time language exchange platform with live chat, 1-on-1/group video calls, screen sharing, friend requests, and 32 unique UI themes.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
    tags: ["React", "Node.js", "MongoDB", "TailwindCSS", "Zustand"],
    liveUrl: "https://fluentra-calls.onrender.com",
    githubUrl: "https://github.com/AyushkhatiDev/fluentra-calls",
    category: "fullstack",
  },
  {
    title: "Full Stack Realtime Chat App",
    description:
      "Real-time messaging app with Socket.io, JWT authentication, online user status, and global state management with Zustand.",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
    tags: ["MERN", "Socket.io", "TailwindCSS", "Daisy UI", "JWT"],
    liveUrl: "https://fullstack-chat-app-2-t3l0.onrender.com",
    githubUrl: "#",
    category: "fullstack",
  },
//   {
//     title: "E-Commerce Platform",
//     description:
//       "A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
//     image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
//     tags: ["React", "Node.js", "MongoDB", "Stripe"],
//     liveUrl: "#",
//     githubUrl: "#",
//     category: "fullstack",
//   },
//   {
//     title: "Task Management App",
//     description:
//       "Collaborative project management tool with drag-and-drop, real-time updates, and team analytics.",
//     image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
//     tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
//     liveUrl: "#",
//     githubUrl: "#",
//     category: "fullstack",
//   },
//   {
//     title: "AI Content Generator",
//     description:
//       "Leveraging GPT-4 to generate marketing copy, blog posts, and social media content automatically.",
//     image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
//     tags: ["Python", "FastAPI", "OpenAI", "React"],
//     liveUrl: "#",
//     githubUrl: "#",
//     category: "ai",
//   },
//   {
//     title: "Real Estate Marketplace",
//     description:
//       "Property listing platform with advanced search, virtual tours, and mortgage calculator.",
//     image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
//     tags: ["Vue.js", "Firebase", "Maps API", "Tailwind"],
//     liveUrl: "#",
//     githubUrl: "#",
//     category: "frontend",
//   },
//   {
//     title: "Fitness Tracking App",
//     description:
//       "Health and fitness tracker with workout plans, nutrition logging, and progress visualization.",
//     image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
//     tags: ["React Native", "GraphQL", "Node.js", "Charts"],
//     liveUrl: "#",
//     githubUrl: "#",
//     category: "mobile",
//   },
//   {
//     title: "Social Media Dashboard",
//     description:
//       "Unified dashboard for managing multiple social accounts with scheduling and analytics.",
//     image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
//     tags: ["React", "D3.js", "Express", "Redis"],
//     liveUrl: "#",
//     githubUrl: "#",
//     category: "frontend",
//   },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "ai", label: "AI/ML" },
  { id: "mobile", label: "Mobile" },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
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
              Portfolio
            </motion.span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto px-4">
              A selection of projects that showcase my expertise in building modern, scalable applications
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="group relative rounded-2xl overflow-hidden glass-card transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-primary/20 flex items-center justify-center pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex gap-3 pointer-events-auto"
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors z-10"
                        >
                          <ExternalLink size={18} />
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors z-10"
                        >
                          <Github size={18} />
                        </a>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <h3 className="font-display text-base sm:text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <motion.div
                        animate={{
                          x: hoveredIndex === index ? 4 : 0,
                          y: hoveredIndex === index ? -4 : 0,
                        }}
                      >
                        <ArrowUpRight
                          className="text-muted-foreground group-hover:text-primary transition-all duration-300"
                          size={18}
                        />
                      </motion.div>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-0">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Mobile Action Buttons - Always visible on mobile */}
                    <div className="flex gap-2 mt-3 sm:hidden">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-border hover:bg-secondary transition-colors"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-8 sm:mt-12"
          >
            <MagneticButton>
              <Button variant="hero-outline" size="lg" className="text-sm sm:text-base">
                <Github className="mr-2" size={18} />
                View All on GitHub
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
