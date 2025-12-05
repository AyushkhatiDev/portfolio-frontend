import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MagneticButton } from "./MagneticButton";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ayushiskhati305@gmail.com",
    href: "mailto:ayushiskhati305@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9134808008",
    href: "tel:+919134808008",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Siliguri, West Bengal",
    href: "#",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      // IMPORTANT: In Vite, use import.meta.env NOT process.env
      // The environment variable MUST be prefixed with VITE_ to be exposed to client
      const API_URL = import.meta.env.VITE_API_URL;
      
      // Debug logging - will show in browser console
      console.log("Using backend URL:", API_URL);
      console.log("Environment mode:", import.meta.env.MODE);
      
      // Validate that API_URL is defined
      if (!API_URL) {
        throw new Error('VITE_API_URL is not defined. Please check your .env file.');
      }

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-background to-background" />
      
      {/* Decorative orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/10 rounded-full blur-[150px]"
      />

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
              Get In Touch
            </motion.span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto px-4">
              Have a project in mind? I'd love to hear about it. Let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <motion.div
                    animate={{
                      scale: focusedField === "name" ? 1.02 : 1,
                    }}
                  >
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-secondary/50 border-border/50 focus:border-primary text-sm sm:text-base"
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: focusedField === "email" ? 1.02 : 1,
                    }}
                  >
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="bg-secondary/50 border-border/50 focus:border-primary text-sm sm:text-base"
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </motion.div>
                </div>
                <motion.div
                  animate={{
                    scale: focusedField === "subject" ? 1.02 : 1,
                  }}
                >
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project inquiry"
                    required
                    className="bg-secondary/50 border-border/50 focus:border-primary text-sm sm:text-base"
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
                <motion.div
                  animate={{
                    scale: focusedField === "message" ? 1.02 : 1,
                  }}
                >
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={4}
                    required
                    className="bg-secondary/50 border-border/50 focus:border-primary resize-none text-sm sm:text-base"
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
                <MagneticButton className="w-full">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} />
                        Send Message
                      </span>
                    )}
                  </Button>
                </MagneticButton>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Contact Cards */}
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((item, index) => (
                  <MagneticButton key={item.label}>
                    <motion.a
                      href={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass-card hover:border-primary/30 transition-all duration-300 group block"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                      >
                        <item.icon size={20} className="sm:w-6 sm:h-6" />
                      </motion.div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-sm sm:text-base">{item.value}</p>
                      </div>
                    </motion.a>
                  </MagneticButton>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-display text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                  Follow Me
                </h3>
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <MagneticButton key={social.label}>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 sm:p-3 rounded-xl glass-card text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 block"
                        aria-label={social.label}
                      >
                        <social.icon size={20} className="sm:w-6 sm:h-6" />
                      </motion.a>
                    </MagneticButton>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 sm:p-6 rounded-2xl gradient-border relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-primary/5"
                  animate={{
                    background: [
                      "linear-gradient(0deg, hsl(187 80% 55% / 0.05), transparent)",
                      "linear-gradient(180deg, hsl(187 80% 55% / 0.05), transparent)",
                      "linear-gradient(360deg, hsl(187 80% 55% / 0.05), transparent)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative z-10">
                  <h3 className="font-display text-lg sm:text-xl font-semibold mb-2">
                    Open for Opportunities
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                    I'm currently available for freelance work and full-time positions.
                  </p>
                  <Button variant="hero" size="sm" asChild className="text-xs sm:text-sm">
                    <a href="/resume.pdf" download>
                      Download Resume
                    </a>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
