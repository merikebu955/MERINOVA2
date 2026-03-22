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
  Zap,
  Sun,
  Moon,
  BookOpen,
  FileText,
  CheckCircle2,
  ArrowRightCircle,
  Languages
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { translations } from "./data/translations";
import ProjectDetails from "./components/ProjectDetails";
import Chatbot from "./components/Chatbot";
import { projects } from "./data/projects";

const navLinks = [
  { name: "About", href: "#about", isExternal: false },
  { name: "Skills", href: "#skills", isExternal: false },
  { name: "Experience", href: "#experience", isExternal: false },
  { name: "Certifications", href: "#certifications", isExternal: false },
  { name: "Services", href: "#services", isExternal: false },
  { name: "Projects", href: "#projects", isExternal: false },
  { name: "Partners", href: "#partners", isExternal: false },
  { name: "Guide", href: "#guide", isExternal: false },
  { name: "Interests", href: "#interests", isExternal: false },
  { name: "Contact", href: "#contact", isExternal: false },
];

const certifications = [
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    date: "March 2025",
    id: "ABC123XYZ",
    link: "#",
    icon: <Award className="w-6 h-6 text-brand-accent" />
  },
  {
    title: "Adobe Certified Professional",
    issuer: "Adobe",
    date: "January 2025",
    icon: <Award className="w-6 h-6 text-brand-secondary" />
  },
  {
    title: "Full Stack Web Development",
    issuer: "FreeCodeCamp",
    date: "November 2024",
    link: "#",
    icon: <Code2 className="w-6 h-6 text-emerald-400" />
  }
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

const partners = [
  {
    name: "MERINOVA",
    logo: "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t51.82787-15/641320752_17908618104346055_8956866662313840143_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeExm4736dbHQqsatbeMHunRFferXmsZ4zsV96teaxnjO4aj3J0yg5ctFa-Z8rY5jU2_jRq5wuyDidz2ThotBxhp&_nc_ohc=_JiYdHSC7pAQ7kNvwEeTvr9&_nc_oc=AdpY2i7w9pUb_NC7wYT1g-Fg02ZuFNVGxSQATqnRiXllZmMW5TXpRCxbd7E-0a8sDJw&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=Lm632tavQvm4b8SRriENPQ&_nc_ss=7a32e&oh=00_AfykIOzxZd95RGaJOExWCzLmLfl0tir4_9YAQTMnom87Dw&oe=69C5924D",
    url: "https://t.me/MerinovaComputer",
    description: "Primary Technology Partner & Strategic Sponsor"
  },
  {
    name: "Global Tech",
    logo: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/568211782_780287265012345_1155859423661286733_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEDGNMJ1Wg-LomqwRm_A0Yr73r7FXZSAi7vevsVdlICLhd20E06w5RYqOM-pr3NVbI3pF9ux7W8dfoZRMKudtPc&_nc_ohc=tNuxkIsh77YQ7kNvwGDX6ar&_nc_oc=AdoZ4K8ylLs0kpKvLbbuJhQ-hh2ZKah_ex1rssjmuWlhPxJqDafxVhN3VzitmDR6Feo&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=X2eeTYIulDioYgg4AKxlxA&_nc_ss=7a32e&oh=00_AfzDo-CjKk2FwDFZ8076Nj-xWOSQzSB1ltgX2JSYH68bFQ&oe=69C58F6D",
    url: "#",
    description: "Proud sponsor of MERINOVA's Web Development projects"
  },
  {
    name: "Innovation Hub",
    logo: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/546181541_748611484846590_8970885558666178341_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeHGCKHbkLRSk313ed1EaJ00-ixguklTIZH6LGC6SVMhkRu9bK-I6bX1N-EKYxcHrrLAR_4HnmI6YarMV9NAl_z3&_nc_ohc=REkQQXOzVl0Q7kNvwEpyUxI&_nc_oc=AdqzXEhcCfwA18OfvQEd_ZLUfR05bIzGCr-bmdcdHzMzYRRJziWSJv_FHKHKSlHUF9s&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=cYVFGOP9ObD7Ow_fPu17GA&_nc_ss=7a32e&oh=00_AfzV8SARvtx7qNH6aybAvgxYLIZTA5tx-4ffsES0NaQ2_g&oe=69C5B809",
    url: "#",
    description: "Technology Partner for the ICMS platform"
  },
  {
    name: "Future Systems",
    logo: "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/533003562_725725320468540_8408092300510923660_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeEWxUfbet26_1oBxYRnCPdShkMWKsM-d6aGQxYqwz53pndzJf7Nq4A2QeUKeMjyilMiCmanwZKPHZVU2b5JHjed&_nc_ohc=7WDASon1jGEQ7kNvwEMxS-y&_nc_oc=AdpGGV0ZBldnI4k6bqHgWhdMCsAmDSzlMRxFdD1rXt_qgCOD3gtcis7LYCeYg7WMH04&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=FbIr2mvKt5IIZNiHI40Bhg&_nc_ss=7a32e&oh=00_Afwg2aaYExSEmz83sTT6rwr5-P7yu5G0lTJybNq7dHfLJQ&oe=69C5B461",
    url: "#",
    description: "Infrastructure & Cloud Solutions Partner"
  }
];

const experience = [
  {
    type: "achievement",
    title: "THE AMBO WINNER – AU Incubation 2025",
    organization: "Ambo University STI HUB",
    location: "Ambo, Ethiopia",
    date: "2025",
    icon: <Trophy className="w-5 h-5" />,
    color: "bg-emerald-500/10 text-emerald-500",
    description: `I walked into Ambo with a dream in my heart,
To be part of STI, to make a new start.
They said "There's a HUB, brand new and bright,
Where winners are made and futures take flight!"
The Innovation Minister opened the door,
Saying "Young talent, we want you to soar!"
AU Incubation 2025 said "Come,
Be part of our family, you're not just some!"
I applied, I prayed, I gave my best,
I knew in my heart I was above the rest.
Then the news came flashing, bright and clear:
"CONGRATULATIONS WINNER! You're selected this year!"
I shouted out loud, I jumped with glee,
"This opportunity was meant for ME!"
To build E-Learning platforms, to code and create,
To show all of Ethiopia I am truly great!`,
    images: [
      "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/644281688_884895267884877_7203403936289528157_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEzW0Ow99geBpj8V0MLXY064NtpNfWWy2rg22k19ZbLaubG5DgQ1dEHZvLMqEzSCFzwVCgwYnb53oNSbpugkRNY&_nc_ohc=OJ94oVO3VqMQ7kNvwHN80In&_nc_oc=AdqC9IiPMXv6U3fxq08qete2MRQRoMUV7D9ILTgwsncfpNhppnU-NP93qFGLcUUz2e0&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=W0AVxiblYc-QC73gQdqAxg&_nc_ss=7a32e&oh=00_AfxriLtmshpbM7v8PxBzNYazqSV7jDm9z6D3KSwu4kQ8AQ&oe=69C59328",
      "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/644356452_884854184555652_7207345378461990189_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeETOow1kq8YkBjt92cU-wHdSVdF69Ofy1RJV0Xr05_LVDDOsDtneblAYexoJDjdnJvfE-nGdWejj8AaA5p_VKMU&_nc_ohc=jUHefve4mFgQ7kNvwEjCQxH&_nc_oc=Ado2oxB9Obkqsi5EGBm8dJ89MJnwOtzOw1dmUu5e31ZbeRnU-ZwqXomgxV1sT-U-A7U&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=fh2xUneTr2KyA9qm3cBhBQ&_nc_ss=7a32e&oh=00_AfwMyAknkqaHsAiwNe_Qd-QxsZtXyK67BW5_mTFuTrxJZw&oe=69C59E15",
      "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/644346482_884854197888984_7322808854859180427_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGa7dTTHQnIbz2DTZT8lPF2kY8wwkWts0CRjzDCRa2zQP1A2wxaANbPvFhO2-9EMqLr_ENnLR49EWPJAOxnWwJo&_nc_ohc=IMxYwO852dYQ7kNvwGybyAc&_nc_oc=AdqnO2nxPXUCBDGWOcWuVXQbJx2iwGy5go0PYMmWMrvauuAMB5Gqu_pOBNRV-6BuJUo&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=fh2xUneTr2KyA9qm3cBhBQ&_nc_ss=7a32e&oh=00_AfzEjbq8YJbroGrCo_K8_JEk65TnhhizVthF0EFbfA7Vjw&oe=69C5943B",
      "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/644318202_884854281222309_519922111175168678_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFFtukm21vzLDADPB0n_ZI1PwZSflL06No_BlJ-UvTo2nJ-dyUeX6uezIKk-gH5rbXkpQmK46vOPaZ7a0NzF2yF&_nc_ohc=BsjoDhXMeP0Q7kNvwGLeNlG&_nc_oc=AdrBAelR0bzp_U_MrHXbJbq9dYKRBkrno1qRGsi2HBOrCJqA3NKSCA0sXh7qGhdf3PI&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=fh2xUneTr2KyA9qm3cBhBQ&_nc_ss=7a32e&oh=00_AfxiAG1zWzT_OLQjn8VlUqNl8wSvhGJEoWwagR4i8lGbpA&oe=69C589E1"
    ],
    highlights: [
      "Selected as a winner for AU Incubation 2025",
      "Opportunity to build E-Learning platforms",
      "Recognition from the Innovation Minister",
      "Part of the Ambo University STI HUB community"
    ]
  },
  {
    type: "achievement",
    title: "Cursor Hackathon – Top Winner",
    organization: "Ambo University Woliso Campus",
    location: "Woliso, Ethiopia",
    date: "Jan 2026",
    icon: <Trophy className="w-5 h-5" />,
    color: "bg-amber-500/10 text-amber-500",
    description: `Congratulations to the winners!
These students are about to graduate, and their team did an outstanding job. 💪🔥
They worked with great focus and dedication, completing the 24-hour Cursor Hackathon without any break—truly impressive!
👏 From Cursor Ethiopia, the 1st and 2nd place winners received $100 each, along with Cursor Premium access for one month.
That means each team member will share the reward—$20 per person for the month. 💰✨
Once again, congratulations to all the winners!
Your hard work, teamwork, and perseverance are inspiring to all of us.`,
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      "https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/611263443_840441825663555_7889179707790170563_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFW-06fIbJcdLC5QvhTREEpwOyTJe4O95PA7JMl7g73k2aC0jqZRjwAjxYfI6AuQNNYwAqaRpWsjuxSFm3Te2uW&_nc_ohc=BSBnchVX5YcQ7kNvwF-I45z&_nc_oc=Adqv8WxXsCWitY5w7vGyMuI7gvo78H0_XHFZaQT5Z3vztA8ei2RkB5EGBQ5Up3w_Rz4&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=b5OdsxE9y63IBqH5CoxYxw&_nc_ss=7a32e&oh=00_Afyw1Phpw6ad7H-MBu0gehUZbCM-BWcFo6h9Qv3dIRB-cQ&oe=69C5B689",
      "https://z-p3-scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/612126914_840442475663490_3733675643418063787_n.jpg?stp=dst-jpg_p261x260_tt6&_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGy_YOa-5p2tyaRu5ZPjB2nmzIY9wnie36bMhj3CeJ7ftUUsL8ni9HMAeDI71MTEM_rRo-Tk874pbqOCVgAUWGB&_nc_ohc=Rsg5FS2-ki8Q7kNvwHxguJN&_nc_oc=Adq8e_QX3Y3eBfdXVKiDLMJHCXjZ4cIXBJtdvsiz4CtxuI3pW3JQ2hnlM7ie7xSdjxM&_nc_zt=23&_nc_ht=z-p3-scontent.fadd2-1.fna&_nc_gid=b5OdsxE9y63IBqH5CoxYxw&_nc_ss=7a32e&oh=00_Afx-xX16am-CcLsU3CQJkCa4H-AFK9McS52pzZ8_n7JiAg&oe=69C59C5D"
    ],
    highlights: [
      "Secured a top position in the 24-hour Cursor Hackathon",
      "Received $100 prize and Cursor Premium access",
      "Recognized for dedication and focus during the intensive competition",
      "Demonstrated exceptional teamwork and perseverance"
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  const navLinks = [
    { name: t.nav.about, href: "#about", isExternal: false },
    { name: t.nav.skills, href: "#skills", isExternal: false },
    { name: t.nav.experience, href: "#experience", isExternal: false },
    { name: t.nav.certifications, href: "#certifications", isExternal: false },
    { name: t.nav.services, href: "#services", isExternal: false },
    { name: t.nav.projects, href: "#projects", isExternal: false },
    { name: t.nav.partners, href: "#partners", isExternal: false },
    { name: t.nav.guide, href: "#guide", isExternal: false },
    { name: t.nav.interests, href: "#interests", isExternal: false },
    { name: t.nav.contact, href: "#contact", isExternal: false },
  ];

  const skills = [
    { name: "Frontend", level: "95%", icon: Code2 },
    { name: "Backend", level: "85%", icon: Server },
    { name: "AI/ML", level: "80%", icon: Cpu },
    { name: "UI/UX", level: "90%", icon: Palette }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-brand-primary text-white' : 'bg-white text-gray-900'} font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden`}>
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? `py-4 ${isDarkMode ? "glass shadow-2xl" : "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-lg text-gray-900"}` 
          : `py-8 bg-transparent ${isDarkMode ? "text-white" : "text-gray-900"}`
      }`}>
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
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                >
                  <Link
                    to={link.href}
                    className="text-sm font-medium hover:text-brand-accent transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full" />
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  className="text-sm font-medium hover:text-brand-accent transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full" />
                </motion.a>
              )
            ))}
            
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navLinks.length * 0.05, duration: 0.5 }}
              className="relative"
            >
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                title="Change Language"
              >
                <Languages className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">{currentLanguage}</span>
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 glass rounded-2xl border border-white/10 p-2 shadow-2xl z-50"
                  >
                    {[
                      { code: 'en', name: 'English' },
                      { code: 'am', name: 'አማርኛ' },
                      { code: 'ar', name: 'العربية' },
                      { code: 'om', name: 'Afaan Oromoo' },
                      { code: 'ti', name: 'ትግርኛ' }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all flex justify-between items-center ${currentLanguage === lang.code ? 'bg-brand-accent text-white' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                      >
                        {lang.name}
                        {currentLanguage === lang.code && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (navLinks.length + 1) * 0.05, duration: 0.5 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-brand-light-text" />}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1 + (navLinks.length + 2) * 0.05, duration: 0.5 }}
              className={`${isDarkMode ? "bg-white text-brand-primary" : "bg-brand-primary text-white"} px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-accent hover:text-white transition-all shadow-lg shadow-white/5`}
            >
              Resume
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button className={`md:hidden ${isDarkMode ? "text-white" : "text-gray-900"}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            className={`fixed inset-0 z-40 ${isDarkMode ? "bg-brand-primary text-white" : "bg-white text-gray-900"} pt-24 px-6 md:hidden`}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Theme</span>
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`p-3 rounded-xl ${isDarkMode ? "bg-white/5" : "bg-gray-100"} transition-colors flex items-center gap-2`}
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="w-5 h-5 text-amber-500" />
                        <span className="text-sm font-medium text-white">Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5 text-brand-accent" />
                        <span className="text-sm font-medium text-gray-900">Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Language</span>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {[
                      { code: 'en', name: 'EN' },
                      { code: 'am', name: 'አማ' },
                      { code: 'ar', name: 'الع' },
                      { code: 'om', name: 'OM' },
                      { code: 'ti', name: 'ትግ' }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setCurrentLanguage(lang.code)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentLanguage === lang.code ? 'bg-brand-accent text-white' : isDarkMode ? 'bg-white/5 text-gray-500' : 'bg-gray-100 text-gray-500'}`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
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
              <div className="flex flex-col gap-3">
                <button className={`${isDarkMode ? "bg-white text-brand-primary" : "bg-brand-primary text-white"} py-4 rounded-xl text-lg font-medium`}>
                  Download Resume
                </button>
                <a 
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-4 rounded-xl text-lg font-medium border ${isDarkMode ? "border-white/10 text-white" : "border-gray-200 text-gray-900"} text-center`}
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden group">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" 
              alt="Hero Background" 
              className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/90 via-brand-primary to-brand-primary" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-brand-accent/20"
                >
                  <Terminal className="w-4 h-4" />
                  <span>{t.available}</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-8"
                >
                  <span className="text-sm md:text-base font-bold text-brand-accent uppercase tracking-[0.3em] block mb-4">{t.welcome}</span>
                  <span className="text-gradient uppercase">MERINOVA</span><br />
                  <span className="text-white/90">{t.tagline}</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed font-light"
                >
                  {t.description}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-wrap gap-6 items-center"
                >
                  <a href="#projects" className="bg-brand-accent text-white px-10 py-5 rounded-full font-bold hover:bg-brand-accent/90 transition-all flex items-center gap-3 group shadow-xl shadow-brand-accent/20">
                    {t.viewWork}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#contact" className={`px-10 py-5 rounded-full font-bold border ${isDarkMode ? "border-white/20 text-white hover:bg-white/10" : "border-gray-200 text-gray-900 hover:bg-gray-100"} transition-all flex items-center gap-3 group`}>
                    Hire Me
                    <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <div className="flex items-center gap-6 px-4">
                    {[
                      { icon: Github, href: "https://github.com/merikebu955", title: "GitHub" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/merikeb-gashu", title: "LinkedIn" },
                      { icon: Twitter, href: "https://twitter.com/wege32", title: "Twitter" }
                    ].map((social, idx) => (
                      <motion.a
                        key={social.title}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + idx * 0.1 }}
                        className="text-gray-400 hover:text-brand-accent transition-colors"
                        title={social.title}
                      >
                        <social.icon className="w-6 h-6" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative hidden lg:block"
              >
                <div className="relative z-10 bg-white/5 p-4 rounded-[40px] shadow-2xl border border-white/10 backdrop-blur-sm">
                  <img 
                    src="https://z-p3-scontent.fadd1-1.fna.fbcdn.net/v/t39.30808-6/644350493_884895654551505_3299952207805544307_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHLM_sLe0ZOOxkm1U0Ezp-DgNn1Oz-3vOmA2fU7P7e86V_88f7W08f6QDrb0im-kRbyKNc4jiz5zAhvCU7CQHuG&_nc_ohc=wxNJ6k8PcI4Q7kNvwGRPnu-&_nc_oc=AdpFfuYV1xF2hrAMhIOY344N3lwc_QJ5fLGGxIK3mQbQKnLVy5X27aK0jm5LKKfIJ4k&_nc_zt=23&_nc_ht=z-p3-scontent.fadd1-1.fna&_nc_gid=yF8t1LQ4Q0U63_U2Uz9mXg&_nc_ss=7a32e&oh=00_AfxxnawkYV7e5ycU_ynD0xnDCESZyxzYb1Dg22bSbgn8fg&oe=69C5AD88" 
                    alt="MERINOVA" 
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
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-6">{t.sections.about}</h2>
                <h3 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">
                  {t.aboutContent.title}
                </h3>
                <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-light">
                  <p>
                    {t.aboutContent.p1}
                  </p>
                  <p>
                    {t.aboutContent.p2}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div>
                    <p className="text-4xl font-bold text-white mb-2">4+</p>
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{t.aboutContent.yearsExp}</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-white mb-2">50+</p>
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{t.aboutContent.projectsDel}</p>
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
        <section id="skills" className={`py-24 relative overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-[#0a0a0f] text-white" : "bg-indigo-50/50 text-gray-900"}`}>
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-0" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 -z-0" />
          
          {/* Floating Particles */}
          <div className="absolute inset-0 -z-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
                className="absolute w-1 h-1 bg-brand-accent rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4"
              >
                {t.sections.skills}
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold"
              >
                Technical <span className="text-gradient">Expertise</span>
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mt-4 max-w-2xl text-lg font-light`}
              >
                A solid foundation in modern web technologies, with a focus on building scalable, responsive, and user-friendly applications.
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              {skillCategories.map((category, i) => (
                <div key={category.title}>
                  <motion.h4 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-xl font-bold mb-8 flex items-center gap-3"
                  >
                    <div className="w-8 h-[1px] bg-brand-accent" />
                    {category.title}
                  </motion.h4>
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
                            <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"} ml-2 italic`}>({skill.years})</span>
                          </div>
                          <span className="text-sm font-bold text-brand-accent">{skill.level}%</span>
                        </div>
                        <div className={`h-2 ${isDarkMode ? "bg-white/10" : "bg-gray-200"} rounded-full overflow-hidden`}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-brand-accent to-brand-secondary"
                          />
                        </div>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-2`}>{skill.desc}</p>
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
                      className={`${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-gray-100 shadow-sm"} p-5 rounded-2xl border flex items-center justify-between group hover:border-brand-accent/30 transition-all`}
                    >
                      <div>
                        <h5 className="font-bold">{lang.name}</h5>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{lang.desc}</p>
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
                      className={`${isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-gray-100 shadow-sm"} p-4 rounded-2xl border flex items-center gap-4 group hover:shadow-md transition-all`}
                    >
                      <div className="text-2xl">{item.flag}</div>
                      <div>
                        <h5 className="font-bold text-sm">{item.name}</h5>
                        <p className={`text-[10px] ${isDarkMode ? "text-gray-500" : "text-gray-400"} leading-tight`}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Achievements Section */}
        <section id="experience" className="py-24 bg-emerald-950 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 blur-[120px] rounded-full -z-0" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-16 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-white/20 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-brand-accent" />
                <span>WELCOME TO MERINOVA</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-4"
              >
                {t.sections.experience}
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
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 whitespace-pre-line">
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
                {t.sections.services}
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
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-6">🚀 {t.sections.projects}</h2>
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
                {t.sections.interests}
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

        {/* Certifications Section */}
        <section id="certifications" className="py-24 bg-brand-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 blur-[120px] -z-0" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-16">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4">{t.sections.certifications}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Licenses & <span className="text-gradient">Certifications</span></h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass p-8 rounded-3xl border border-white/10 hover:border-brand-accent/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {cert.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white">{cert.title}</h4>
                  <p className="text-brand-secondary font-medium text-sm mb-1">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs mb-4">{cert.date}</p>
                  {cert.id && (
                    <p className="text-gray-400 text-[10px] font-mono mb-4">ID: {cert.id}</p>
                  )}
                  {cert.link && (
                    <a 
                      href={cert.link}
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent hover:text-white transition-colors group/link"
                    >
                      Verify Credential
                      <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Guide Section */}
        <section id="guide" className="py-32 bg-brand-primary relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-accent/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-6">{t.sections.guide}</h2>
                  <h3 className="text-5xl font-bold text-white mb-8 leading-tight">
                    MERINOVA <br />
                    <span className="text-gradient">Portfolio Guide</span>
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-10">
                    We'll guide you through the entire process of creating a professional and responsive personal portfolio website. 
                    Learn how to build the structure, style it with CSS, add interactivity with JavaScript, and make it look great on all devices.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-xl bg-brand-accent/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                      </div>
                      <span className="text-sm font-medium">Step-by-step instructions</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-xl bg-brand-secondary/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-brand-secondary" />
                      </div>
                      <span className="text-sm font-medium">Best practices for design</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Get Started & Choose a Layout",
                      content: "Log in to your creative account and navigate to your portfolio builder. Choose a layout that fits your style—you can always customize it later. Pick a theme that highlights your best work and click 'Use this layout'.",
                      icon: <Rocket className="w-6 h-6" />
                    },
                    {
                      step: "02",
                      title: "Add Your Profile Photo",
                      content: "Your profile photo is your first impression. Upload a high-quality headshot through the settings or your 'About' page. A clear, professional photo helps build trust with potential clients and employers.",
                      icon: <User className="w-6 h-6" />
                    },
                    {
                      step: "03",
                      title: "Add Your Work (Projects)",
                      content: "Showcase your creative work by adding 'Projects'. Upload high-resolution images, videos, or case studies. Add clear titles and descriptions to explain the context, your role, and the impact of each project.",
                      icon: <Briefcase className="w-6 h-6" />
                    },
                    {
                      step: "04",
                      title: "Organize Your Content",
                      content: "Keep your portfolio professional by organizing work into Collections (e.g., Graphic Design vs. Photography). Reorder your images to tell a cohesive story and ensure your best pieces are seen first.",
                      icon: <Layers className="w-6 h-6" />
                    },
                    {
                      step: "05",
                      title: "Design & Publish",
                      content: "Customize your site's fonts, colors, and spacing to match your brand. Preview your site on mobile and desktop to ensure responsiveness. Once you're happy, hit 'Publish' to share your work with the world!",
                      icon: <Globe className="w-6 h-6" />
                    },
                    {
                      step: "06",
                      title: "Multilingual Support",
                      content: "Reach a global audience by adding support for multiple languages like Amharic (አማርኛ), Arabic (العربية), Oromo (Afaan Oromoo), and Tigrinya (ትግርኛ). Use separate pages or a language switcher to manage translations effectively.",
                      icon: <Languages className="w-6 h-6" />
                    },
                    {
                      step: "07",
                      title: "Add Certifications",
                      content: "Boost your credibility by showcasing your professional certifications. Include the title, issuing organization, date earned, and a verification link or credential ID for authenticity.",
                      icon: <Award className="w-6 h-6" />
                    }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-8 rounded-3xl glass border border-white/10 hover:border-brand-accent/30 transition-all group flex gap-6"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                          <span className="text-brand-accent group-hover:text-white font-bold font-mono">{item.step}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-3 text-white flex items-center gap-3">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Essential Sections Breakdown */}
            <div className="mt-32">
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Essential Portfolio <span className="text-gradient">Structure</span></h3>
                <p className="text-gray-400 max-w-2xl mx-auto">Every professional portfolio needs a solid foundation. Here are the core sections you must include to stand out.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "1. Hero Section",
                    desc: "The first impression. Includes your name, role, a brief tagline, and a professional headshot.",
                    icon: <Layout className="w-6 h-6 text-blue-400" />
                  },
                  {
                    title: "2. About Me / Bio",
                    desc: "Your story. Background, education, passions, and your unique approach to work.",
                    icon: <User className="w-6 h-6 text-purple-400" />
                  },
                  {
                    title: "3. Work Samples",
                    desc: "The most important part. Showcase 6-10 of your best projects with context and results.",
                    icon: <Briefcase className="w-6 h-6 text-emerald-400" />
                  },
                  {
                    title: "4. Skills & Expertise",
                    desc: "A quick visual list of your technical and soft skills to show your professional range.",
                    icon: <Code2 className="w-6 h-6 text-orange-400" />
                  },
                  {
                    title: "5. Contact Section",
                    desc: "Make it easy to reach you. Include email, professional social links, and a contact form.",
                    icon: <Mail className="w-6 h-6 text-sky-400" />
                  },
                  {
                    title: "6. Optional Extras",
                    desc: "Testimonials, resume downloads, services list, or a blog to show thought leadership.",
                    icon: <Sparkles className="w-6 h-6 text-pink-400" />
                  },
                  {
                    title: "7. Certifications",
                    desc: "Showcase your professional credentials, licenses, and achievements to build authority.",
                    icon: <Award className="w-6 h-6 text-yellow-400" />
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-accent/30 transition-all"
                  >
                    <div className="mb-6">{item.icon}</div>
                    <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Multilingual Setup Section */}
            <div className="mt-32">
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Multilingual <span className="text-gradient">Setup</span></h3>
                <p className="text-gray-400 max-w-2xl mx-auto">Expand your reach by making your portfolio accessible in multiple languages. Here's how to handle translations for Amharic, Arabic, Oromo, and Tigrinya.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl glass border border-white/10"
                >
                  <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                    <Languages className="w-6 h-6 text-brand-accent" />
                    Implementation Options
                  </h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-brand-secondary font-bold text-sm mb-2 uppercase tracking-wider">Option 1: Built-in Features</h5>
                      <p className="text-gray-400 text-sm">Platforms like Wix or Squarespace have native multilingual settings. Enable them to manage translations directly within the editor.</p>
                    </div>
                    <div>
                      <h5 className="text-brand-secondary font-bold text-sm mb-2 uppercase tracking-wider">Option 2: Manual Method</h5>
                      <p className="text-gray-400 text-sm">Create separate pages for each language (e.g., /am for Amharic). Add a language switcher in your navbar to link these pages together.</p>
                    </div>
                    <div>
                      <h5 className="text-brand-secondary font-bold text-sm mb-2 uppercase tracking-wider">Option 3: Translation Widgets</h5>
                      <p className="text-gray-400 text-sm">Use tools like the Google Translate widget for a quick (though less precise) automated solution across your entire site.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl glass border border-white/10"
                >
                  <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                    <FileText className="w-6 h-6 text-brand-secondary" />
                    Typing & Fonts
                  </h4>
                  <div className="space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h5 className="text-white font-bold text-sm mb-1">Amharic & Tigrinya</h5>
                        <p className="text-gray-400 text-xs">Use Power Geez or GeezIME software. Online tools like Lexilogos are great for quick typing.</p>
                      </div>
                      <span className="text-brand-accent font-mono text-xs">አማርኛ / ትግርኛ</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h5 className="text-white font-bold text-sm mb-1">Arabic</h5>
                        <p className="text-gray-400 text-xs">Enable the built-in Arabic keyboard in your OS settings. Supports right-to-left (RTL) layouts.</p>
                      </div>
                      <span className="text-brand-accent font-mono text-xs">العربية</span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h5 className="text-white font-bold text-sm mb-1">Oromo</h5>
                        <p className="text-gray-400 text-xs">Uses the Latin alphabet (Qubee). No special keyboard needed—just standard typing.</p>
                      </div>
                      <span className="text-brand-accent font-mono text-xs">Afaan Oromoo</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Quick Setup Table */}
            <div className="mt-32 p-8 md:p-12 rounded-[2.5rem] glass border border-white/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[100px] -z-10" />
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Quick Step-by-Step <span className="text-gradient">Setup</span></h3>
                <p className="text-gray-400">A checklist to get your portfolio live in record time.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 px-6 text-sm font-bold uppercase tracking-widest text-brand-accent">Step</th>
                      <th className="py-4 px-6 text-sm font-bold uppercase tracking-widest text-brand-accent">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { step: "1", action: "Choose platform (Adobe Portfolio, Squarespace, Wix, or Webflow)" },
                      { step: "2", action: "Pick a clean, minimal theme that puts images first" },
                      { step: "3", action: "Add your photo in the hero or about section" },
                      { step: "4", action: "Write your about me text" },
                      { step: "5", action: "Upload 6–10 projects with titles and descriptions" },
                      { step: "6", action: "Add contact info and social links" },
                      { step: "7", action: "Preview on mobile and desktop" },
                      { step: "8", action: "Publish and share your URL" }
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6 font-mono text-brand-secondary font-bold">{row.step}</td>
                        <td className="py-4 px-6 text-gray-300">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted Partners & Sponsors Section */}
        <section id="partners" className="py-32 bg-brand-primary relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-brand-accent/5 blur-[120px] -z-0" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-20 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-4"
              >
                {t.sections.partners}
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-white"
              >
                Trusted <span className="text-gradient">Partners</span> & Sponsors
              </motion.h3>
            </div>

            <div className="relative overflow-hidden py-10">
              <div className="marquee-track gap-8">
                {[...partners, ...partners].map((partner, i) => (
                  <motion.a
                    key={`${partner.name}-${i}`}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="group flex flex-col items-center gap-6 w-[300px] flex-shrink-0"
                  >
                    <div className="relative w-full">
                      <div className="absolute -inset-4 bg-brand-accent/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-full aspect-[4/3] rounded-[40px] overflow-hidden glass border border-white/10 shadow-2xl shadow-black/50 flex items-center justify-center p-8 group-hover:border-brand-accent/50 transition-all duration-500 relative z-10">
                        <img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="text-center relative z-10">
                      <h4 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors tracking-tight">{partner.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-1">{partner.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
              
              {/* Gradient masks for smooth fade */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-primary to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-primary to-transparent z-20 pointer-events-none" />
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
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">📬 {t.sections.contact}</h2>
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
            <div className="flex flex-col items-center md:items-start gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden glass border border-white/10 p-2">
                  <img 
                    src={partners[0].logo} 
                    alt="Merinova Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-3xl font-black italic tracking-tighter text-gradient">
                  MERINOVA
                </div>
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
                © {new Date().getFullYear()} MERINOVA. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}
