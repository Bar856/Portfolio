"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Project data type
interface Project {
  name: string;
  tools: string;
  desc: string;
  screenshots: string[];
  url?: string;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// Spotlight component for cursor tracking
function Spotlight() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div className="spotlight" />;
}

// Navigation component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050508]/80 backdrop-blur-xl border-b border-white/5"
          : ""
      }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-xl font-bold tracking-tight"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <span className="text-accent">B</span>ar
          <span className="text-accent">.</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-10">
          {["Work", "About", "Contact"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}>
              {item}
            </motion.a>
          ))}
        </div>

        <motion.a
          href="#contact"
          className="btn-premium hidden md:flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <span>Let&apos;s Talk</span>
        </motion.a>
      </div>
    </motion.nav>
  );
}

// Hero section
function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="hero-bg" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 mb-8">
            <span className="w-12 h-[1px] bg-accent" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-text-muted">
              Full-Stack Developer
            </span>
            <span className="w-12 h-[1px] bg-accent" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
            <span className="block">Crafting Digital</span>
            <span className="block text-gradient">Experiences</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="max-w-xl text-lg md:text-xl text-[#8a8a9a] leading-relaxed mb-12">
            Building premium web applications with meticulous attention to
            detail. Specializing in <span className="text-accent">Next.js</span>
            , <span className="text-accent">React</span>, and modern{" "}
            <span className="text-accent">SaaS</span> solutions.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#work"
              className="btn-premium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              <span>View Projects</span>
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 text-xs font-medium tracking-[0.1em] uppercase text-[#8a8a9a] hover:text-foreground transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              Get in Touch →
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a9a]">
              Scroll
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Project card component
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}>
      <motion.article
        className="project-card group"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
        {/* Image container */}
        <div className="project-image-container">
          <Image
            src={project.screenshots[0]}
            alt={project.name}
            fill
            className="project-image"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Overlay with project number */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-xs font-mono tracking-wider text-accent/60">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* View project button - appears on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent text-background text-xs font-medium tracking-[0.1em] uppercase rounded-full hover:bg-accent/90 transition-colors">
                View Live
              </a>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-300">
              {project.name}
            </h3>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8a8a9a] hover:text-accent transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </a>
            )}
          </div>

          <p className="text-[#8a8a9a] text-sm md:text-base leading-relaxed mb-6">
            {project.desc}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tools.split(", ").map((tool) => (
              <span key={tool} className="tag">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

// Projects section
function ProjectsSection({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-32 md:py-48" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent mb-4 block">
              Featured Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Selected
              <br />
              <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <p className="max-w-md text-[#8a8a9a] text-lg">
            A collection of projects that showcase my expertise in building
            modern, scalable applications.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// About section
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "MongoDB", "PostgreSQL"],
    },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel"] },
  ];

  return (
    <section id="about" className="py-32 md:py-48 bg-[#08080c]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left column - Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}>
            <motion.span
              variants={fadeInUp}
              className="text-xs font-medium tracking-[0.3em] uppercase text-accent mb-4 block">
              About Me
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Building the
              <br />
              <span className="text-gradient">Future of Web</span>
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="space-y-6 text-[#8a8a9a] text-lg leading-relaxed">
              <p>
                I&apos;m a passionate full-stack developer with expertise in
                creating premium digital experiences. With a focus on clean code
                and thoughtful design, I build applications that are both
                beautiful and functional.
              </p>
              <p>
                My approach combines technical excellence with creative
                problem-solving, resulting in solutions that stand out in
                today&apos;s competitive digital landscape.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 grid grid-cols-3 gap-6">
              {skills.map((skill) => (
                <div key={skill.category}>
                  <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
                    {skill.category}
                  </h4>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-[#8a8a9a] hover:text-foreground transition-colors">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Visual element */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute inset-0 border border-accent/20 rounded-2xl transform rotate-3" />
              <div className="absolute inset-0 border border-accent/10 rounded-2xl transform -rotate-3" />

              {/* Main box */}
              <div className="relative h-full bg-gradient-to-br from-[#0c0c10] to-[#12121a] rounded-2xl border border-white/5 p-8 flex flex-col justify-center">
                <div className="text-center">
                  <div className="text-8xl font-bold text-accent/20 mb-4">
                    5+
                  </div>
                  <div className="text-sm tracking-[0.2em] uppercase text-[#8a8a9a]">
                    Years of Experience
                  </div>
                </div>

                <div className="divider my-8" />

                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent/80 mb-2">
                      50+
                    </div>
                    <div className="text-xs tracking-wider uppercase text-[#8a8a9a]">
                      Projects
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent/80 mb-2">
                      30+
                    </div>
                    <div className="text-xs tracking-wider uppercase text-[#8a8a9a]">
                      Happy Clients
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Contact section
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 md:py-48" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto">
          <motion.span
            variants={fadeInUp}
            className="text-xs font-medium tracking-[0.3em] uppercase text-accent mb-4 block">
            Get in Touch
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            Let&apos;s Create
            <br />
            <span className="text-gradient">Something Great</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-[#8a8a9a] leading-relaxed mb-12">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s
            discuss how we can work together to bring your vision to life.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a
              href="mailto:barmaizel1@gmail.com"
              className="btn-premium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              <span>Start a Conversation</span>
            </motion.a>

            <div className="flex items-center gap-6">
              {/* Social links */}
              {[
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com/in/barmaizel",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  name: "GitHub",
                  href: "https://github.com/barmaizel",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8a8a9a] hover:text-accent transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}>
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#8a8a9a]">
            © {new Date().getFullYear()} Bar Maizel. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-sm text-[#8a8a9a]">
            <span>Crafted with</span>
            <span className="text-accent">♦</span>
            <span>precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main page component
export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Spotlight cursor effect */}
      <Spotlight />

      {/* Grain texture overlay */}
      <div className="grain" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <HeroSection />

        {/* Divider */}
        <div className="divider max-w-7xl mx-auto" />

        {loading ? (
          <div className="py-32 flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
          </div>
        ) : (
          <ProjectsSection projects={projects} />
        )}

        {/* Divider */}
        <div className="divider max-w-7xl mx-auto" />

        <AboutSection />

        {/* Divider */}
        <div className="divider max-w-7xl mx-auto" />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
