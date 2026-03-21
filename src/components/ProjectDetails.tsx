import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Layout, Server, Database, Code2, Sparkles, ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold hover:bg-brand-accent transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white group-hover:bg-brand-accent transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-900 group-hover:text-brand-accent transition-colors">Back to Portfolio</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-400">{project.category}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{project.title}</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden aspect-[21/9] shadow-2xl shadow-brand-primary/10"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-20">
              {/* Problem & Solution */}
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                      <Layout className="w-4 h-4" />
                    </div>
                    The Challenge
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    Our Solution
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                    <Code2 className="w-4 h-4" />
                  </div>
                  Core Features
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-primary/20 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-900">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  The Impact
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {project.impact}
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {project.impactDetails.map((detail, i) => (
                    <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                      <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-brand-primary" />
                      </div>
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-12">
              {/* Technologies */}
              <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <Server className="w-5 h-5 text-brand-primary" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, i) => (
                    <div key={i} className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-600 shadow-sm">
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-8 rounded-3xl bg-brand-primary text-white">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <Database className="w-5 h-5 text-white/60" />
                  Project Info
                </h3>
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-white/60 block mb-1">Category</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-white/60 block mb-1">Role</span>
                    <span className="font-medium">Full-Stack Developer</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-white/60 block mb-1">Status</span>
                    <span className="font-medium">Completed</span>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-brand-primary py-4 rounded-xl font-bold hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      View Live Site
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.behanceUrl && (
                    <a 
                      href={project.behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#1769ff] text-white py-4 rounded-xl font-bold hover:bg-[#0056f7] transition-all flex items-center justify-center gap-2"
                    >
                      View on Behance
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white/10 text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/20"
                    >
                      GitHub Repo
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4">Next Project</h2>
          <Link 
            to={`/project/${projects[(projects.indexOf(project) + 1) % projects.length].slug}`}
            className="group inline-block"
          >
            <h3 className="text-4xl md:text-6xl font-bold mb-8 group-hover:text-brand-primary transition-colors">
              {projects[(projects.indexOf(project) + 1) % projects.length].title}
            </h3>
            <div className="flex items-center justify-center gap-4 text-brand-primary font-bold">
              <span>View Case Study</span>
              <div className="w-12 h-12 rounded-full border-2 border-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">© 2026 Merike Bgashu. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/" className="text-sm font-bold text-gray-900 hover:text-brand-primary transition-colors">Home</Link>
            <a href="#projects" className="text-sm font-bold text-gray-900 hover:text-brand-primary transition-colors">Projects</a>
            <a href="#contact" className="text-sm font-bold text-gray-900 hover:text-brand-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetails;
