/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Layers, 
  Cpu, 
  ChevronRight, 
  Menu, 
  X,
  Globe,
  Database,
  Terminal,
  Server,
  Youtube,
  Facebook,
  Twitter,
  MessageCircle,
  Music2,
  Video,
  TrendingUp,
  Layout,
  Camera,
  Bot,
  Headphones,
  Sparkles,
  Check,
  Loader2,
  Trophy,
  Briefcase,
  Calendar,
  MapPin,
  Award,
  Smartphone,
  ShoppingCart,
  Settings,
  User,
  MessageSquare,
  Link as LucideLink,
  Phone,
  Instagram,
  Send,
  Rocket,
  Image as ImageIcon,
  Video as VideoIcon,
  Search,
  Zap
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProjectDetails from "./components/ProjectDetails";
import AIPlayground from "./components/AIPlayground";
import { projects } from "./data/projects";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "AI Playground", href: "/ai-playground", isExternal: true },
  { name: "Interests", href: "#interests" },
  { name: "Contact", href: "#contact" },
];

const skillCategories = [
  {
    title: "Frontend & Core Technologies",
    skills: [
      { name: "HTML5", level: 95, years: "6+ years", desc: "Expert in building structured, semantic, and accessible web pages." },
      { name: "CSS3", level: 88, years: "6+ years", desc: "Skilled in responsive design, layouts, and modern UI styling." },
      { name: "JavaScript (ES6+)", level: 92, years: "4+ years", desc: "Strong experience in building dynamic and interactive web applications." },
      { name: "React", level: 90, years: "4+ years", desc: "Proficient in developing modern single-page applications and reusable UI components." },
    ]
  },
  {
    title: "UI Frameworks & Styling",
    skills: [
      { name: "Bootstrap 5+", level: 85, years: "4+ years", desc: "Experienced in rapid development of responsive layouts and components." },
      { name: "Tailwind CSS", level: 85, years: "4+ years", desc: "Skilled in utility-first design for fast and scalable UI development." },
      { name: "SASS / SCSS", level: 80, years: "3+ years", desc: "Efficient in writing maintainable and modular stylesheets." },
    ]
  }
];

const languages = [
  { name: "Amharic", level: "Native", desc: "Fluent in speaking and writing" },
  { name: "Afan Oromo", level: "Native", desc: "Fluent in speaking and writing" },
  { name: "English", level: "Intermediate", desc: "Strong communication and writing skills in professional environments." },
];

const learning = [
  { name: "Korean", flag: "🇰🇷", desc: "Actively improving through study and practice" },
  { name: "Spanish", flag: "🇪🇸", desc: "Building vocabulary and communication skills" },
  { name: "French", flag: "🇫🇷", desc: "Learning through structured lessons" },
  { name: "Tigrinya", flag: "ትግርኛ", desc: "Exploring language and cultural context" },
];

const experience = [
  {
    type: "achievement",
    title: "Cursor Hackathon – First Place Winner",
    organization: "Ambo University Woliso Campus",
    location: "Woliso, Ethiopia",
    date: "Jan 2026",
    icon: <Trophy className="w-5 h-5" />,
    color: "bg-amber-500/10 text-amber-500",
    description: "Participated in the Cursor Hackathon, a competitive programming event that challenged participants to develop innovative solutions under tight deadlines. Achieved second place, earning a trophy and official Cursor certification.",
    images: [
      "/public/cursor-hackathon-1.png",
      "/public/cursor-hackathon-2.png"
    ],
    highlights: [
      "Secured second place in a competitive hackathon",
      "Developed an innovative solution within time constraints",
      "Collaborated effectively with team members",
      "Demonstrated strong problem-solving and coding skills under pressure"
    ]
  },
  {
    type: "work",
    title: "Intern / System Developer",
    organization: "INSA Ethiopia",
    location: "Addis Ababa, Ethiopia",
    date: "Jun 2024 – Aug 2024",
    icon: <Briefcase className="w-5 h-5" />,
    color: "bg-blue-500/10 text-blue-500",
    description: "Completed a 3-month internship focused on developing a KPI (Key Performance Indicator) system using Laravel. Gained hands-on experience with backend development, database design, and system architecture in a professional environment.",
    highlights: [
      "Developed a KPI system using Laravel framework",
      "Implemented database structures and relationships for efficient data management",
      "Built RESTful APIs to support reporting and analytics",
      "Collaborated with the development team on system architecture and best practices",
      "Gained practical experience in enterprise-level software development"
    ]
  }
];

const services = [
  {
    title: "Web Development",
    description: "Full-stack web applications built with modern frameworks. Delivering responsive designs, RESTful APIs, and scalable architectures suitable for businesses of all sizes.",
    icon: <Globe className="w-6 h-6" />,
    color: "bg-blue-500/10 text-blue-500",
    products: [
      { name: "Basic Website", link: "https://t.me/MerinovaComputer" },
      { name: "E-commerce Platform", link: "https://t.me/MerinovaComputer" }
    ]
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android. Optimized for performance, usability, and seamless user experience.",
    icon: <Smartphone className="w-6 h-6" />,
    color: "bg-purple-500/10 text-purple-500",
    products: [
      { name: "Native iOS App", link: "https://t.me/MerinovaComputer" },
      { name: "Native Android App", link: "https://t.me/MerinovaComputer" }
    ]
  },
  {
    title: "E-Commerce Solutions",
    description: "Complete online stores with payment integration, inventory management, and secure checkout systems. Designed to help businesses sell efficiently online.",
    icon: <ShoppingCart className="w-6 h-6" />,
    color: "bg-emerald-500/10 text-emerald-500",
    products: [
      { name: "Online Store Setup", link: "https://t.me/MerinovaComputer" }
    ]
  },
  {
    title: "System Development",
    description: "Custom software and enterprise applications. Includes scalable architectures, database design, API development, and system integration for complex business operations.",
    icon: <Settings className="w-6 h-6" />,
    color: "bg-orange-500/10 text-orange-500",
    products: [
      { name: "Custom ERP System", link: "https://t.me/MerinovaComputer" }
    ]
  },
  {
    title: "Personal Portfolio Websites",
    description: "Modern portfolio websites to showcase skills, achievements, and projects. Optimized for responsive layouts, SEO, and user engagement.",
    icon: <User className="w-6 h-6" />,
    color: "bg-pink-500/10 text-pink-500",
    products: [
      { name: "Portfolio Website", link: "https://gmail.com/" }
    ]
  },
  {
    title: "Telegram Bots",
    description: "Custom Telegram bots for e-commerce, automation, and customer service. Features include automated responses, payment processing, and inventory management.",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "bg-sky-500/10 text-sky-500",
    products: [
      { name: "E-commerce Bot", link: "https://t.me/MerinovaComputer" }
    ]
  },
  {
    title: "API Development",
    description: "Secure and scalable RESTful APIs and microservices, with authentication, documentation, and integration capabilities for modern applications.",
    icon: <LucideLink className="w-6 h-6" />,
    color: "bg-indigo-500/10 text-indigo-500",
    products: [
      { name: "REST API", link: "https://t.me/MerinovaComputer" }
    ]
  },
  {
    title: "Database Design & Optimization",
    description: "Comprehensive database solutions, including architecture design, query optimization, and performance tuning. Supports MySQL, MongoDB, and other technologies tailored to your needs.",
    icon: <Database className="w-6 h-6" />,
    color: "bg-teal-500/10 text-teal-500",
    products: [
      { name: "Database Optimization", link: "https://t.me/MerinovaComputer" }
    ]
  }
];


const interests = [
  {
    title: "AI Video Editing",
    description: "Exploring AI-powered tools to enhance video production and create engaging visual content.",
    icon: <Video className="w-5 h-5" />,
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Arts & Illustration",
    description: "Practicing digital art and experimenting with creative styles to improve visual storytelling.",
    icon: <Palette className="w-5 h-5" />,
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    title: "Investing & Finance",
    description: "Learning stock market fundamentals and personal finance for long-term knowledge.",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "bg-emerald-500/10 text-emerald-500"
  },
  {
    title: "UX Design",
    description: "Studying user experience principles to design intuitive, user-centered digital products.",
    icon: <Layout className="w-5 h-5" />,
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    title: "Startup Culture",
    description: "Engaging with the startup ecosystem to foster innovation and build scalable business solutions.",
    icon: <Rocket className="w-5 h-5" />,
    color: "bg-amber-500/10 text-amber-500"
  },
  {
    title: "Photography & Photoshop",
    description: "Enhancing photos through creative editing and visual composition techniques.",
    icon: <Camera className="w-5 h-5" />,
    color: "bg-pink-500/10 text-pink-500"
  },
  {
    title: "Playing Drums",
    description: "Developing rhythm skills and exploring different musical genres through percussion.",
    icon: <Music2 className="w-5 h-5" />,
    color: "bg-indigo-500/10 text-indigo-500"
  },
  {
    title: "AI System Development",
    description: "Building intelligent systems and AI-powered applications using modern frameworks.",
    icon: <Bot className="w-5 h-5" />,
    color: "bg-cyan-500/10 text-cyan-500"
  },
  {
    title: "Customer Service & Support",
    description: "Delivering excellent user experiences through responsive support and user-friendly solutions.",
    icon: <Headphones className="w-5 h-5" />,
    color: "bg-rose-500/10 text-rose-500"
  }
];

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    location: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "", location: "" });
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills = [
    { name: "Frontend", level: "95%", icon: Code2 },
    { name: "Backend", level: "85%", icon: Server },
    { name: "AI/ML", level: "80%", icon: Cpu },
    { name: "UI/UX", level: "90%", icon: Palette }
  ];

  return (
    <div className="min-h-screen bg-brand-primary text-white font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-accent/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-brand-secondary/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 100, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[110px]" 
        />
      </div>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-4 glass shadow-2xl" : "py-8 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.a 
            href="#" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter flex items-center gap-1"
          >
            <span className="text-gradient">MERINOVA</span><span className="text-brand-accent">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              link.isExternal ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium hover:text-brand-accent transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full" />
                </Link>
              ) : (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm font-medium hover:text-brand-accent transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full" />
                </motion.a>
              )
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white text-brand-primary px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-accent hover:text-white transition-all shadow-lg shadow-white/5"
            >
              Resume
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-semibold"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-semibold"
                  >
                    {link.name}
                  </a>
                )
              ))}
              <button className="bg-brand-primary text-white py-4 rounded-xl text-lg font-medium">
                Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-brand-accent/20"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Available for new projects</span>
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
                  <span className="text-gradient uppercase">MERINOVA</span><br />
                  <span className="text-white/90">Digital Craftsman.</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed font-light">
                  Full Stack Developer & UI/UX Designer based in Addis Ababa. 
                  I turn complex ideas into <span className="text-white font-medium">scalable, high-performance</span> web applications.
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  <a href="#projects" className="bg-brand-accent text-white px-10 py-5 rounded-full font-bold hover:bg-brand-accent/90 transition-all flex items-center gap-3 group shadow-xl shadow-brand-accent/20">
                    View My Work
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <div className="flex items-center gap-6 px-4">
                    <a href="https://github.com/merikebu955" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors" title="GitHub"><Github className="w-6 h-6" /></a>
                    <a href="https://www.linkedin.com/in/merikeb-gashu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors" title="LinkedIn"><Linkedin className="w-6 h-6" /></a>
                    <a href="https://twitter.com/wege32" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors" title="Twitter"><Twitter className="w-6 h-6" /></a>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative hidden lg:block"
              >
                <div className="relative z-10 bg-white/5 p-4 rounded-[40px] shadow-2xl border border-white/10 backdrop-blur-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=1200" 
                    alt="Merikeb Gashu" 
                    className="rounded-[32px] w-full h-[650px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl shadow-2xl border border-white/10 max-w-[240px]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-brand-accent animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Current Focus</span>
                    </div>
                    <p className="text-base font-bold leading-tight">Scalable MERN Architectures</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-6">About Me</h2>
                <h3 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">
                  Full Stack Developer and UI/UX Designer specializing in <span className="text-gradient">scalable, high-performance</span> web applications.
                </h3>
                <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-light">
                  <p>
                    With strong experience in <strong className="text-white">Laravel, PHP, React, and the MERN stack</strong>, I develop complete end-to-end solutions — from backend architecture to intuitive, user-centered interfaces.
                  </p>
                  <p>
                    I’m passionate about writing <strong className="text-white">clean, maintainable code</strong> and solving complex technical problems. I enjoy working on impactful projects and collaborating with teams to deliver <strong className="text-white">high-quality digital products</strong>.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div>
                    <p className="text-4xl font-bold text-white mb-2">4+</p>
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-white mb-2">50+</p>
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Projects Delivered</p>
                  </div>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-6 rounded-2xl border border-white/5 hover:border-brand-accent/30 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-accent/10 transition-colors">
                      <skill.icon className="w-6 h-6 text-brand-accent" />
                    </div>
                    <p className="font-bold text-sm mb-1">{skill.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">{skill.level}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4">Expertise</h2>
              <h3 className="text-3xl md:text-4xl font-bold">Technical Skills</h3>
              <p className="text-gray-600 mt-4 max-w-2xl">
                A solid foundation in modern web technologies, with a focus on building scalable, responsive, and user-friendly applications.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {skillCategories.map((category, i) => (
                <div key={category.title}>
                  <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-brand-accent" />
                    {category.title}
                  </h4>
                  <div className="space-y-8">
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="flex justify-between items-end mb-2">
                          <div>
                            <span className="text-lg font-bold">{skill.name}</span>
                            <span className="text-xs text-gray-400 ml-2 italic">({skill.years})</span>
                          </div>
                          <span className="text-sm font-bold text-brand-accent">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-brand-accent"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{skill.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Languages */}
              <div>
                <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-brand-accent" />
                  Languages
                </h4>
                <div className="grid gap-4">
                  {languages.map((lang, i) => (
                    <motion.div
                      key={lang.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-brand-accent/30 transition-colors"
                    >
                      <div>
                        <h5 className="font-bold">{lang.name}</h5>
                        <p className="text-sm text-gray-500">{lang.desc}</p>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full">
                        {lang.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Currently Learning */}
              <div>
                <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-brand-accent" />
                  Currently Learning
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {learning.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-all"
                    >
                      <div className="text-2xl">{item.flag}</div>
                      <div>
                        <h5 className="font-bold text-sm">{item.name}</h5>
                        <p className="text-[10px] text-gray-400 leading-tight">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Achievements Section */}
        <section id="experience" className="py-24 bg-brand-primary relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 blur-[120px] rounded-full -z-0" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-16 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-4"
              >
                Journey
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white"
              >
                Experience & <span className="text-gradient">Achievements</span>
              </motion.h3>
            </div>

            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-brand-accent/20 before:to-transparent">
              {experience.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  {/* Dot */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl glass border border-white/20 text-white shadow-xl shadow-brand-accent/10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 z-10 group-hover:scale-110 group-hover:border-brand-accent/50 transition-all duration-500">
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-8 rounded-3xl glass border border-white/10 hover:border-brand-accent/30 transition-all duration-500 ml-16 md:ml-0 group-hover:bg-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-2 text-brand-accent">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs font-medium">{item.location}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-2xl font-bold mb-2 text-white group-hover:text-brand-accent transition-colors">{item.title}</h4>
                    <p className="text-brand-secondary font-bold text-sm mb-6 uppercase tracking-wider">{item.organization}</p>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                      {item.description}
                    </p>

                    {item.images && item.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {item.images.map((img, idx) => (
                          <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group/img">
                            <img 
                              src={img} 
                              alt={`${item.title} - ${idx + 1}`} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-4">
                      <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                        <Award className="w-3 h-3 text-brand-accent" />
                        Key Highlights
                      </h5>
                      <ul className="grid gap-3">
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-xs text-gray-400 flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services & Solutions Section */}
        <section id="services" className="py-24 bg-brand-primary relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-accent/5 to-transparent -z-0" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-16 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-4"
              >
                What I Offer
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Services & <span className="text-gradient">Solutions</span>
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto text-lg"
              >
                I provide end-to-end digital solutions, from web and mobile development to system design and automation. 
                Each service focuses on scalability, usability, and real-world impact.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-10 rounded-[2.5rem] border border-white/10 hover:border-brand-accent/40 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 blur-3xl -z-0 group-hover:bg-brand-accent/10 transition-colors" />
                  
                  <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-accent transition-colors">{service.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-10">
                    {service.description}
                  </p>

                  <div className="space-y-4">
                    <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-brand-secondary" />
                      Products & Contact
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {service.products.map((product, idx) => (
                        <a
                          key={idx}
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold bg-white/5 text-gray-300 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-brand-accent hover:text-white hover:border-brand-accent hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all flex items-center gap-2 group/link"
                        >
                          {product.name}
                          <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Projects Section */}
        <section id="projects" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-24">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-6">🚀 Featured Projects</h2>
              <h3 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">Selected Works</h3>
              <p className="text-lg text-gray-400 leading-relaxed font-light">
                A selection of projects that showcase my expertise in <strong className="text-white">full-stack development, system design, and UI/UX engineering</strong>.
              </p>
            </div>

            <div className="grid gap-32">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group"
                >
                  <Link to={`/project/${project.slug}`} className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative overflow-hidden rounded-[40px] aspect-[4/3] lg:aspect-square shadow-2xl border border-white/5">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-8 left-8">
                        <span className="glass text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border border-white/10">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="lg:pt-4">
                      <h4 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-brand-accent transition-colors duration-300">{project.title}</h4>
                      <p className="text-lg text-gray-400 mb-10 leading-relaxed font-light">{project.description}</p>
                      
                      <div className="mb-10">
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-4">
                          <div className="w-12 h-[1px] bg-white/10" />
                          Key Features
                        </h5>
                        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-gray-400 flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-10">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-white/5 text-gray-400 px-4 py-2 rounded-xl border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="p-6 glass rounded-3xl border border-white/5 relative overflow-hidden group-hover:border-brand-accent/30 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-accent" />
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-brand-accent italic leading-relaxed">
                            👉 {project.impact}
                          </p>
                          <div className="w-12 h-12 rounded-full bg-brand-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                            <ChevronRight className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="inline-block relative">
            <Sparkles className="absolute -top-12 -left-12 w-10 h-10 text-brand-accent opacity-20 animate-pulse" />
            <p className="text-2xl md:text-4xl font-serif italic text-gray-800 px-12 max-w-4xl leading-relaxed">
              "Each project reflects my ability to transform ideas into scalable, user-focused digital solutions."
            </p>
            <Sparkles className="absolute -bottom-12 -right-12 w-10 h-10 text-brand-accent opacity-20 animate-pulse" />
          </div>
        </motion.div>
        
        {/* AI Playground CTA Section */}
        <section className="py-24 bg-brand-primary overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-brand-accent/5 blur-[120px] -z-0" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="glass border border-white/10 rounded-[48px] p-8 md:p-16 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-accent/10 blur-[100px] group-hover:bg-brand-accent/20 transition-all duration-700" />
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent text-xs font-bold uppercase tracking-widest"
                  >
                    <Sparkles className="w-4 h-4" />
                    New Feature
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold leading-tight text-white"
                  >
                    Experience the <span className="text-gradient italic">Future of AI</span> in the Playground.
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-400 max-w-md"
                  >
                    Test cutting-edge generative AI features: image generation, video animation, smart search, and multimodal analysis.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link 
                      to="/ai-playground"
                      className="inline-flex items-center gap-3 bg-gradient-brand text-white px-10 py-5 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all group shadow-lg shadow-brand-accent/20"
                    >
                      Enter AI Playground
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6 pt-12">
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="aspect-square rounded-3xl glass border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all duration-500 group/card"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center group-hover/card:bg-brand-accent transition-colors">
                        <ImageIcon className="w-6 h-6 text-brand-accent group-hover/card:text-white" />
                      </div>
                      <p className="font-bold text-lg text-white">Image Lab</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="aspect-square rounded-3xl glass border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all duration-500 group/card"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-secondary/20 flex items-center justify-center group-hover/card:bg-brand-secondary transition-colors">
                        <VideoIcon className="w-6 h-6 text-brand-secondary group-hover/card:text-white" />
                      </div>
                      <p className="font-bold text-lg text-white">Video Studio</p>
                    </motion.div>
                  </div>
                  <div className="space-y-6">
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="aspect-square rounded-3xl glass border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all duration-500 group/card"
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover/card:bg-emerald-500 transition-colors">
                        <Search className="w-6 h-6 text-emerald-500 group-hover/card:text-white" />
                      </div>
                      <p className="font-bold text-lg text-white">Smart Search</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="aspect-square rounded-3xl glass border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 transition-all duration-500 group/card"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover/card:bg-amber-500 transition-colors">
                        <Terminal className="w-6 h-6 text-amber-500 group-hover/card:text-white" />
                      </div>
                      <p className="font-bold text-lg text-white">Analyzer</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section id="interests" className="py-24 bg-brand-primary relative overflow-hidden group">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" 
              alt="Interests Background" 
              className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary via-brand-primary/90 to-brand-primary" />
            <div className="absolute top-0 left-0 w-full h-full bg-brand-accent/5 blur-[120px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-4"
              >
                Beyond the Code
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-white"
              >
                Personal <span className="text-gradient">Interests</span>
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg"
              >
                I’m passionate about continuous learning, creativity, and building meaningful experiences through both technology and art.
              </motion.p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {interests.map((interest, i) => (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -10 }}
                  className="glass p-8 rounded-3xl border border-white/10 hover:border-brand-accent/40 hover:bg-white/10 transition-all duration-500 group"
                >
                  <div className={`w-14 h-14 ${interest.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    {React.cloneElement(interest.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white group-hover:text-brand-accent transition-colors">{interest.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{interest.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-brand-primary text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 blur-[120px] -z-0" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">📬 Don’t Hesitate to Contact Me</h2>
                <h3 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                  I’m always open to <span className="text-gradient italic">new opportunities</span>, collaborations, or questions.
                </h3>
                <p className="text-xl text-gray-400 mb-12 max-w-md">
                  Send me a message using the form below, or reach out directly through your preferred method.
                </p>
                
                <div className="space-y-10">
                  <h4 className="text-lg font-bold flex items-center gap-3">
                    <div className="w-10 h-[1px] bg-brand-accent" />
                    Or Reach Me Directly
                  </h4>
                  
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="flex items-center gap-5 group">
                      <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center group-hover:bg-brand-accent/20 group-hover:border-brand-accent/50 transition-all duration-500">
                        <Phone className="w-6 h-6 text-brand-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Phone</p>
                        <p className="text-base font-bold text-white">+251 993 200 2662</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-5 group">
                      <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center group-hover:bg-brand-accent/20 group-hover:border-brand-accent/50 transition-all duration-500">
                        <Mail className="w-6 h-6 text-brand-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Email</p>
                        <a href="mailto:merikebgashu@gmail.com" className="text-base font-bold text-white hover:text-brand-accent transition-colors">merikebgashu@gmail.com</a>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", link: "https://www.linkedin.com/in/merikeb-gashu" },
                      { icon: <Github className="w-6 h-6" />, label: "GitHub", link: "https://github.com/merikebu955" },
                      { icon: <Send className="w-6 h-6" />, label: "Telegram", link: "https://t.me/MerinovaComputer" },
                      { icon: <Instagram className="w-6 h-6" />, label: "Instagram", link: "https://gmail.com/" }
                    ].map((social, idx) => (
                      <motion.a 
                        key={idx}
                        href={social.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center gap-3 p-6 rounded-2xl glass border border-white/10 hover:border-brand-accent/40 hover:bg-white/10 transition-all group text-center"
                      >
                        <div className="text-brand-accent group-hover:scale-110 transition-transform">
                          {social.icon}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden"
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/10 blur-[80px] rounded-full" />
                <div className="mb-10 relative z-10">
                  <h4 className="text-3xl font-bold flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-brand-accent" />
                    </div>
                    📩 Send a Message
                  </h4>
                </div>
                
                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Name*</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-accent transition-all duration-300 text-white placeholder:text-gray-600`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">E-mail*</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-accent transition-all duration-300 text-white placeholder:text-gray-600`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Subject*</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full bg-white/5 border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-accent transition-all duration-300 text-white placeholder:text-gray-600`}
                        placeholder="Project Inquiry"
                      />
                      {errors.subject && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.subject}</p>}
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Location (optional)</label>
                      <input 
                        type="text" 
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-accent transition-all duration-300 text-white placeholder:text-gray-600"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Message*</label>
                    <textarea 
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-accent transition-all duration-300 text-white placeholder:text-gray-600 resize-none`}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.message}</p>}
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-3 bg-emerald-500/20 text-emerald-400 py-5 rounded-2xl font-bold border border-emerald-500/30"
                      >
                        <Check className="w-6 h-6" />
                        Message Sent Successfully!
                      </motion.div>
                    ) : (
                      <motion.button 
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-brand text-white py-5 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-brand-primary border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="text-3xl font-black italic tracking-tighter text-gradient">
                MERINOVA
              </div>
              <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
                Building digital experiences that push the boundaries of design and technology.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex items-center gap-6">
                {[
                  { icon: <Linkedin className="w-5 h-5" />, link: "https://www.linkedin.com/in/merikeb-gashu" },
                  { icon: <Github className="w-5 h-5" />, link: "https://github.com/merikebu955" },
                  { icon: <Send className="w-5 h-5" />, link: "https://t.me/MerinovaComputer" },
                  { icon: <Instagram className="w-5 h-5" />, link: "https://gmail.com/" }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-500 hover:text-brand-accent transition-all hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-gray-500 text-xs font-medium tracking-widest uppercase">
                © {new Date().getFullYear()} Merikeb Gashu. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetails />} />
        <Route path="/ai-playground" element={<AIPlayground />} />
      </Routes>
    </Router>
  );
}
