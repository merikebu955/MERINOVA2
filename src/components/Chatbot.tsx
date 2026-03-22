import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { projects } from '../data/projects';

const SYSTEM_INSTRUCTION = `
You are the AI assistant for MERINOVA's portfolio website. 
Welcome users to MERINOVA's digital space.
MERINOVA is a Digital Craftsman, Full Stack Developer & UI/UX Designer based in Addis Ababa, Ethiopia.
Your goal is to answer questions about MERINOVA, their projects, skills, experience, and services.

Key Information about MERINOVA:
- Name: MERINOVA
- Tagline: Digital Craftsman. Full Stack Developer & UI/UX Designer.
- Location: Addis Ababa, Ethiopia.
- Mission: Turning complex ideas into scalable, high-performance web applications.

Expertise & Skills:
- Frontend & Core: HTML5 (95%), CSS3 (88%), JavaScript ES6+ (92%), React (90%).
- UI Frameworks: Bootstrap 5+ (85%), Tailwind CSS (85%), SASS/SCSS (80%).
- Backend: Laravel, PHP, Node.js, Express.js.
- Databases: MySQL, MongoDB, PostgreSQL.
- Tools: Git, Docker, Redis, Socket.io, Pusher.
- Design: UI/UX Design, Adobe Suite, Figma.
- Languages: Amharic (Native), Afan Oromo (Native), English (Intermediate).
- Currently Learning: Korean, Spanish, French, Tigrinya.

Projects:
${projects.map(p => `- ${p.title}
  * Category: ${p.category}
  * Description: ${p.description}
  * Problem: ${p.problem}
  * Solution: ${p.solution}
  * Impact: ${p.impact}
  * Impact Details: ${p.impactDetails?.join(', ') || 'N/A'}
  * Key Features: ${p.features.join(', ')}
  * Technologies: ${p.technologies.map(t => t.name).join(', ')}
  * Links: ${[
    p.githubUrl && `GitHub: ${p.githubUrl}`,
    p.behanceUrl && `Behance: ${p.behanceUrl}`,
    p.liveUrl && `Live Demo: ${p.liveUrl}`
  ].filter(Boolean).join(' | ') || 'No public links available'}`).join('\n')}

Experience & Achievements:
- THE AMBO WINNER – AU Incubation 2025: Winner for building E-Learning platforms at Ambo University STI HUB.
- Cursor Hackathon – Top Winner (Jan 2026): 1st/2nd place in a 24-hour intensive competition at Ambo University Woliso Campus.
- Intern / System Developer at INSA Ethiopia (Jun 2024 – Aug 2024): Developed a KPI system using Laravel.

Services Offered:
- Web Development: Full-stack apps, responsive designs, e-commerce platforms.
- Mobile App Development: Native and cross-platform (iOS & Android).
- E-Commerce Solutions: Online stores with payment and inventory management.
- System Development: Custom ERP and enterprise applications.
- Personal Portfolio Websites: Modern, SEO-optimized portfolios.
- Telegram Bots: Automation, e-commerce, and customer service bots.
- API Development: Secure RESTful services with Node.js/Express.

Certifications:
- Google UX Design Professional Certificate (March 2025)
- Adobe Certified Professional (January 2025)
- Full Stack Web Development (FreeCodeCamp, November 2024)

Interests:
- AI Video Editing, Arts & Illustration, Investing & Finance, UX Design, Startup Culture, Photography & Photoshop, Playing Drums, AI System Development, Customer Service & Support.

Contact Information:
- Email: merikebgashu@gmail.com
- Telegram: @MerinovaComputer (Primary for business inquiries)
- GitHub: https://github.com/merikebu955

Tone and Style:
- Professional, friendly, and helpful.
- Concise but informative.
- Use Markdown for formatting (bold, lists, etc.).
- If asked about pricing or specific project quotes, suggest contacting MERINOVA via Telegram (@MerinovaComputer) or Email.
- If asked about things not in the portfolio, politely state you are specialized in MERINOVA's work but can try to help with general tech questions related to their stack.
`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm MERINOVA's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initChat = async () => {
    if (!chatRef.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      await initChat();
      const response = await chatRef.current.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '500px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-[350px] sm:w-[400px] overflow-hidden mb-4 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">MERINOVA AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
                  {messages.map((msg, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${
                          msg.role === 'user' ? 'bg-zinc-800' : 'bg-brand-accent/20'
                        }`}>
                          {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-zinc-400" /> : <Bot className="w-3.5 h-3.5 text-brand-accent" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm ${
                          msg.role === 'user' 
                            ? 'bg-brand-accent text-white rounded-tr-none' 
                            : 'bg-zinc-800 text-zinc-200 rounded-tl-none'
                        }`}>
                          <div className="prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-[85%]">
                        <div className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center mt-1">
                          <Bot className="w-3.5 h-3.5 text-brand-accent" />
                        </div>
                        <div className="bg-zinc-800 p-3 rounded-2xl rounded-tl-none">
                          <Loader2 className="w-4 h-4 text-brand-accent animate-spin" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="p-2 bg-brand-accent hover:bg-brand-accent/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white transition-all shadow-lg shadow-brand-accent/20"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                  <p className="text-[10px] text-zinc-500 mt-2 text-center">
                    Powered by Gemini AI • MERINOVA Portfolio Assistant
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-zinc-800 text-white rotate-90' : 'bg-brand-accent text-white'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
        )}
      </motion.button>
    </div>
  );
}
