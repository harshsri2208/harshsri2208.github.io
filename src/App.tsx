import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Globe, 
  MessageSquare, 
  Send, 
  X, 
  ChevronRight,
  Terminal,
  Database,
  Cloud,
  Layout,
  Briefcase
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';

// Types
interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  icon: React.ReactNode;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
}

// Data
const PROJECTS: Project[] = [
  {
    title: "SAP Labs Case Study",
    description: "Detailed documentation of my on-campus internship interview experience and preparation journey at SAP Labs. Highlights competitive coding and system design patterns.",
    tags: ["SAP", "Interview", "System Design"],
    link: "https://harshsri2208.github.io",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    title: "Project Manna",
    description: "A comprehensive social utility platform for efficient food distribution. Built to solve local logistical challenges in aid management.",
    tags: ["Social Impact", "PHP", "MySQL"],
    link: "https://github.com/harshsri2208/Giftable-CSR-Hackathon", // Relinked to verified social impact repo
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Project Sanjeevani",
    description: "Emergency medical response system featuring real-time resource tracking and ambulance dispatching algorithms.",
    tags: ["Healthcare", "React", "Firebase"],
    link: "https://github.com/harshsri2208/Project-Sanjeevani",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    title: "QBox & QMoney",
    description: "Advanced financial dashboard for personal wealth management, featuring automated expense tracking and goal-setting.",
    tags: ["Fintech", "Java", "Android"],
    link: "https://github.com/harshsri2208/expense-tracker",
    icon: <Database className="w-6 h-6" />,
  },
  {
    title: "Sentiment Engine",
    description: "High-throughput NLP pipeline analyzing Twitter streams for public sentiment trends using Scikit-Learn and NLTK.",
    tags: ["Python", "ML", "NLP"],
    link: "https://github.com/harshsri2208/Real-Time-Categorical-Tweet-Analyzer",
    icon: <Terminal className="w-6 h-6" />,
  },
  {
    title: "PyWarriors Community",
    description: "An educational hub for Python enthusiasts, reaching thousands of learners through structured tutorials and communal code reviews.",
    tags: ["Education", "Python", "Community"],
    link: "https://pywarriors.com",
    icon: <Code2 className="w-6 h-6" />,
  }
];

const SKILLS = [
  { name: "Frontend", items: ["React", "TypeScript", "Tailwind", "Next.js"] },
  { name: "Backend", items: ["Node.js", "Express", "Python", "Java"] },
  { name: "Cloud/DevOps", items: ["Firebase", "AWS", "Docker", "Git"] },
  { name: "ML/Data", items: ["Scikit-Learn", "NLP", "Pandas", "Scraping"] },
];

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hi! I'm Harsh's AI assistant. Ask me anything about his projects, experience, or skills!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [{ text: `You are an AI assistant representing Harsh Srivastava. 
            Information about Harsh:
            - Projects: ${PROJECTS.map(p => p.title).join(', ')}
            - Key Experience: SAP Labs Internship
            - Skills: ${SKILLS.map(s => s.items.join(', ')).join(', ')}
            
            Be professional, helpful, and concise. Respond in a way that matches the "Vibrant Neo-Pop" aesthetic of this portfolio—energetic, punchy, and modern.` }]
          },
          { parts: [{ text: input }] }
        ]
      });

      const aiMessage: Message = { role: 'ai', content: response.text || "I apologize, but I am unable to respond at the moment." };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "I encounter a connection issue. Please allow me a moment to recover." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col md:flex-row p-6 md:p-10 lg:p-12 gap-0 overflow-x-hidden relative">
      <div className="mesh-bg" />
      {/* Sidebar */}
      <aside className="w-full md:w-80 lg:w-96 flex flex-col justify-between md:pr-10 lg:pr-12 border-b md:border-b-0 md:border-r border-border pb-10 md:pb-0">
        <div className="space-y-12">
          <div className="profile-section">
            <span className="micro-label">Software Engineer</span>
            <h1 className="editorial-title bg-gradient-to-br from-white via-white to-accent bg-clip-text text-transparent">
              Harsh<br />Srivastava
            </h1>
          </div>

          <div className="bio text-ink-dim text-sm leading-relaxed max-w-xs">
            Crafting digital experiences through elegant code and intentional design. Currently focused on distributed systems and creative UI.
          </div>

          <nav>
            <ul className="space-y-4">
              <li><a href="#projects" className="editorial-nav-link active">Selected Works</a></li>
              <li><a href="#about" className="editorial-nav-link">About Me</a></li>
              <li><a href="#contact" className="editorial-nav-link">Contact</a></li>
              <li><button onClick={() => setIsChatOpen(true)} className="editorial-nav-link text-left">Ask AI Assistant</button></li>
              <li><a href="https://linkedin.com/in/harshsri2208" target="_blank" rel="noreferrer" className="editorial-nav-link">LinkedIn</a></li>
              <li><a href="https://github.com/harshsri2208" target="_blank" rel="noreferrer" className="editorial-nav-link">GitHub</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 md:mt-0 flex flex-col gap-2 text-[12px] text-ink-dim uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Available for collaboration
          </div>
          <div>Based in Bangalore, India</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-10 lg:pl-16 pt-12 md:pt-0 overflow-y-auto">
        <div className="max-w-4xl space-y-24">
          
          {/* Projects Section */}
          <section id="projects" className="space-y-8">
            <div className="flex justify-between items-end border-b border-border pb-4">
              <h2 className="font-serif text-3xl">Featured Projects</h2>
              <span className="micro-label mb-0">01 &mdash; 06</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="project-card group"
                >
                  <span className="micro-label">{project.tags[0] || "System"}</span>
                  <h3 className="group-hover:text-accent transition-colors flex items-center justify-between">
                    {project.title}
                    {project.link && <a href={project.link} target="_blank" rel="noreferrer"><ExternalLink size={16} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" /></a>}
                  </h3>
                  <p className="text-ink-dim text-sm leading-relaxed mb-6 h-12 overflow-hidden line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(1).map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest text-ink-dim px-2 py-1 border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="space-y-12">
            <div className="flex justify-between items-end border-b border-border pb-4">
              <h2 className="font-serif text-3xl">About Me</h2>
              <span className="micro-label mb-0">BIOGRAPHY</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 text-ink-dim text-sm leading-relaxed">
                <p>
                  I am a Software Engineer based in India, driven by the intersection of complex backends and intuitive interfaces. My journey started with a fascination for automation, which led me to build tools that simplify human interaction with technology.
                </p>
                <p>
                  With a solid foundation in Computer Science, I've had the privilege of working with organizations like SAP Labs, where I honed my skills in enterprise-grade software development. My aspirations lie in architecting scalable distributed systems that empower global communities.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <span className="micro-label !text-[9px]">AWARDS</span>
                    <ul className="mt-2 space-y-1 text-ink">
                      <li>• SAP Excellence Intern</li>
                      <li>• Hackathon Winner 2023</li>
                    </ul>
                  </div>
                  <div>
                    <span className="micro-label !text-[9px]">EDUCATION</span>
                    <ul className="mt-2 space-y-1 text-ink">
                      <li>• B.Tech, Computer Science</li>
                      <li>• Specialization in AI/ML</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {SKILLS.map(skill => (
                  <div key={skill.name} className="space-y-3">
                    <span className="micro-label !text-accent">{skill.name}</span>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map(i => (
                        <span key={i} className="text-[10px] text-ink font-mono">{i}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-8">
            <div className="flex justify-between items-end border-b border-border pb-4">
              <h2 className="font-serif text-3xl">Experience</h2>
            </div>
            
            <div className="space-y-0">
              <div className="exp-row">
                <div>
                  <div className="exp-company">SAP Labs</div>
                  <div className="exp-role text-ink-dim text-sm">Case Study & Internship Prep</div>
                </div>
                <div className="exp-year">2024 &mdash; Pres.</div>
              </div>
              <div className="exp-row">
                <div>
                  <div className="exp-company">PyWarriors Community</div>
                  <div className="exp-role text-ink-dim text-sm">Lead Developer</div>
                </div>
                <div className="exp-year">2023 &mdash; 2024</div>
              </div>
              <div className="exp-row border-none">
                <div>
                  <div className="exp-company">Software Engineering Projects</div>
                  <div className="exp-role text-ink-dim text-sm">Full Stack Development</div>
                </div>
                <div className="exp-year">2022 &mdash; 2023</div>
              </div>
            </div>
          </section>

          {/* Background/Philosophy Section */}
          <section className="space-y-6 max-w-2xl">
            <span className="micro-label">Behind the Code</span>
            <p className="font-serif text-2xl font-bold text-accent leading-snug">
              "The most powerful technologies are those that disappear into the fabric of daily life."
            </p>
            <p className="text-ink-dim text-sm leading-relaxed">
              I believe in software that is as beautiful internally as it is externally. My approach combines the rigor of engineering with the nuance of design, ensuring that every line of code serves a larger narrative.
            </p>
          </section>

          {/* Contact Section */}
          <section id="contact" className="space-y-12">
            <div className="flex justify-between items-end border-b border-border pb-4">
              <h2 className="font-serif text-3xl">Get in Touch</h2>
              <span className="micro-label mb-0">CONTACT</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-ink-dim text-sm leading-relaxed">
                  Whether you have a question about my work or just want to say hello, my inbox is always open. Feel free to reach out via the form, or connect through social channels.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-ink">
                    <Mail size={18} className="text-accent" />
                    <span className="text-sm">harshsri2208@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-ink">
                    <Globe size={18} className="text-accent" />
                    <span className="text-sm">Bangalore, India</span>
                  </div>
                </div>
              </div>
              <form 
                action="https://formspree.io/f/mnjlvjrp" // The user will need to replace this with their actual Formspree ID
                method="POST"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  
                  // If they haven't configured a real endpoint yet, we show a friendly success message for the demo
                  if (form.action.includes('placeholder')) {
                    alert("Demo: In a live deployment, this would send a message to your email via Formspree! Please replace the placeholder ID in App.tsx with your own.");
                    form.reset();
                    return;
                  }

                  try {
                    const res = await fetch(form.action, {
                      method: 'POST',
                      body: formData,
                      headers: { 'Accept': 'application/json' }
                    });
                    if (res.ok) {
                      alert("Message received! I'll get back to you soon.");
                      form.reset();
                    }
                  } catch (err) {
                    alert("Something went wrong. Please check your internet connection and try again.");
                  }
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="micro-label !mb-0 !text-[9px]">NAME</label>
                    <input name="name" required className="w-full bg-surface border border-border p-3 text-sm text-ink outline-none focus:border-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label !mb-0 !text-[9px]">EMAIL</label>
                    <input name="email" type="email" required className="w-full bg-surface border border-border p-3 text-sm text-ink outline-none focus:border-accent" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="micro-label !mb-0 !text-[9px]">MESSAGE</label>
                  <textarea name="message" required rows={4} className="w-full bg-surface border border-border p-3 text-sm text-ink outline-none focus:border-accent resize-none" />
                </div>
                <button type="submit" className="w-full py-4 bg-accent text-bg font-extrabold text-sm uppercase tracking-widest hover:bg-white hover:scale-[1.02] transition-all duration-300">
                  Dispatch Message
                </button>
                <p className="text-[10px] text-ink-dim italic text-center">
                  This form uses a secure serverless integration to forward messages to my primary address.
                </p>
              </form>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-border">
            <div className="flex gap-8">
              <a href="https://github.com/harshsri2208" className="text-ink-dim hover:text-accent transition-colors uppercase tracking-widest text-[10px] font-bold">Github</a>
              <a href="https://linkedin.com/in/harshsri2208" className="text-ink-dim hover:text-accent transition-colors uppercase tracking-widest text-[10px] font-bold">Linkedin</a>
              <a href="mailto:harshsri2208@gmail.com" className="text-ink-dim hover:text-accent transition-colors uppercase tracking-widest text-[10px] font-bold">Email</a>
            </div>
            <p className="text-[10px] text-ink-dim uppercase tracking-[3px]">
              &copy; 2026 Harsh Srivastava
            </p>
          </footer>
        </div>
      </main>

      {/* AI Chat Drawer - Theme Adjusted */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l border-border z-[70] flex flex-col"
            >
              <div className="p-8 border-b border-border flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="micro-label mb-1">Interactive Assistant</span>
                  <h3 className="font-serif text-xl">Harsh AI</h3>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 rounded-full hover:bg-white/5 text-ink-dim hover:text-ink transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex flex-col max-w-[90%]",
                      m.role === 'user' ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "text-sm leading-relaxed p-4 border",
                      m.role === 'user' 
                        ? "bg-accent/10 border-accent/20 text-accent" 
                        : "bg-bg/50 border-border text-ink-dim"
                    )}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 text-accent animate-pulse ml-2">
                    <span className="text-[10px] uppercase tracking-widest italic">Consulting the model...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-8 border-t border-border">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask a technical question..."
                    className="w-full bg-bg border border-border px-5 py-4 text-sm text-ink focus:outline-none focus:border-accent/50 transition-all font-serif italic"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-accent disabled:opacity-30 transition-all"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Twitter({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
