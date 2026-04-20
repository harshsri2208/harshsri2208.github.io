import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
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
  Briefcase,
  Monitor,
  Copy,
  Check
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from './lib/utils';

const MindBlowingBadge = () => {
  const boundingRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  // Parallax layers mapped to the local hover mouse
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], [10, -10]);
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const fgX = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const fgY = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);

  // Global mouse tracking for the pupil
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      if (!boundingRef.current) return;
      const rect = boundingRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      // Cap the distance the pupil can move from center
      const dist = Math.min(Math.hypot(dx, dy) * 0.06, 14);
      setMousePos({
         x: Math.cos(angle) * dist,
         y: Math.sin(angle) * dist
      });
    };
    window.addEventListener('mousemove', handleGlobalMove);
    return () => window.removeEventListener('mousemove', handleGlobalMove);
  }, []);

  // Chaotic comic book blinking pattern
  useEffect(() => {
     const blink = () => {
         setIsBlinking(true);
         setTimeout(() => setIsBlinking(false), 120);
         setTimeout(blink, Math.random() * 4000 + 800);
     };
     const timer = setTimeout(blink, 1000);
     return () => clearTimeout(timer);
  }, []);

  const handleMouseMoveLocal = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeaveLocal = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="relative mb-8 group cursor-crosshair z-20 w-[144px] h-[144px] md:w-[192px] md:h-[192px]">
        {/* Tilting highlight drop shadow layer */}
        <div className="absolute -inset-2 bg-accent-yellow transform -rotate-3 cartoon-border rounded-[2rem] w-full h-full -z-10 group-hover:-rotate-6 transition-transform duration-300" />
        
        {/* Main 3D Card Window */}
        <motion.div 
           ref={boundingRef}
           onMouseMove={handleMouseMoveLocal}
           onMouseLeave={handleMouseLeaveLocal}
           style={{ rotateX, rotateY }}
           className="w-full h-full rounded-3xl cartoon-border bg-accent cartoon-shadow relative overflow-hidden flex items-center justify-center transition-shadow duration-300 group-hover:shadow-[12px_12px_0_var(--color-shadow)]"
        >
           {/* Deep Background - Moves Opposite */}
           <motion.div 
               style={{ x: bgX, y: bgY }}
               className="absolute text-transparent inset-[-40%] opacity-40 bg-[radial-gradient(black_4px,transparent_4px)] [background-size:24px_24px]"
           />

           {/* The All-Seeing Eye */}
           <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center border-[6px] border-black shadow-[inset_-6px_-6px_0_rgba(0,0,0,0.1)] overflow-hidden z-10 transition-transform duration-300 group-hover:scale-110">
             {/* The Pupil */}
             <motion.div 
                animate={{ x: mousePos.x, y: mousePos.y }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-10 h-10 md:w-14 md:h-14 bg-black rounded-full shadow-[inset_-2px_-2px_0_#FFF] flex items-center justify-center relative"
             >
                {/* Anime/Comic Eye Glimmer */}
                <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full absolute top-1 right-2 md:top-2 md:right-3" />
             </motion.div>

             {/* Eyelid */}
             <motion.div 
                initial={{ height: "0%" }}
                animate={{ height: isBlinking ? "100%" : "0%" }}
                transition={{ duration: 0.1, ease: "easeIn" }}
                className="absolute top-0 left-0 w-full bg-accent-blue border-b-[6px] border-black z-10"
             />
           </div>

           {/* Hover Foreground Badge - Moves with Mouse */}
           <motion.div
             style={{ x: fgX, y: fgY }}
             className="absolute bottom-2 right-2 bg-accent-yellow text-black font-black text-lg md:text-xl px-2 py-1 rotate-[-12deg] cartoon-border shadow-[4px_4px_0_#000] z-20"
           >
             A.I.
           </motion.div>
        </motion.div>
    </div>
  );
};

const TerminalPreview = () => {
  return (
    <div className="bg-[#0c0c0c] cartoon-border p-4 md:p-6 font-mono text-[10px] md:text-xs leading-none overflow-x-auto select-none">
      <div className="text-[#38BDF8]">╔═════════════════════════════════════════════════════════════════════════╗</div>
      <div className="flex">
        <span className="text-[#38BDF8]">║</span>
        <pre className="text-[#FF3366] leading-none">   ██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗                        </pre>
        <span className="text-[#38BDF8]">║</span>
      </div>
      <div className="flex">
        <span className="text-[#38BDF8]">║</span>
        <pre className="text-[#FF3366] leading-none">   ██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║                        </pre>
        <span className="text-[#38BDF8]">║</span>
      </div>
      <div className="flex">
        <span className="text-[#38BDF8]">║</span>
        <pre className="text-[#FF3366] leading-none">   ███████║███████║██████╔╝███████╗███████║                        </pre>
        <span className="text-[#38BDF8]">║</span>
      </div>
      <div className="flex">
        <span className="text-[#38BDF8]">║</span>
        <pre className="text-[#FF3366] leading-none">   ██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║                        </pre>
        <span className="text-[#38BDF8]">║</span>
      </div>
      <div className="flex">
        <span className="text-[#38BDF8]">║</span>
        <pre className="text-[#FF3366] leading-none">   ██║  ██║██║  ██║██║  ██║███████║██║  ██║                        </pre>
        <span className="text-[#38BDF8]">║</span>
      </div>
      <div className="flex">
        <span className="text-[#38BDF8]">║</span>
        <pre className="text-[#FF3366] leading-none">   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝                        </pre>
        <span className="text-[#38BDF8]">║</span>
      </div>
      <div className="flex">
        <span className="text-[#38BDF8]">║</span>
        <span className="flex-1" />
        <span className="text-[#38BDF8]">║</span>
      </div>
      <div className="flex px-4 items-center">
        <span className="text-[#38BDF8]">║</span>
        <span className="flex-1 text-[#FFD600] font-black">   SRIVASTAVA <span className="text-white">|</span> <span className="text-[#00E5FF]">Software Engineer</span></span>
        <span className="text-[#38BDF8]">║</span>
      </div>
      <div className="text-[#38BDF8]">╚═════════════════════════════════════════════════════════════════════════╝</div>
      
      <div className="mt-4 text-[#00E5FF]">── ABOUT ───────────────────────────────────────────────────────────────────</div>
      <div className="text-white mt-1">Crafting digital experiences through elegant code and intentional design.</div>
      <div className="text-white">Currently focused on exploring AI and scalable apps.</div>

      <div className="mt-4 text-[#00E5FF]">── CONNECT ─────────────────────────────────────────────────────────────────</div>
      <div className="text-[#38BDF8]">• GitHub:   <span className="text-white">https://github.com/harshsri2208</span></div>
      <div className="text-[#38BDF8]">• LinkedIn: <span className="text-white">https://www.linkedin.com/in/harsh-srivastava-harshsri2208/</span></div>
      
      <div className="mt-4 flex items-center gap-2">
        <span className="text-[#00E676] font-bold text-xs uppercase px-1.5 py-0.5 bg-[#00E676]/20 rounded border border-[#00E676]/30">Live Terminal Mode</span>
        <span className="text-gray-500 text-[10px]">Ready to receive connections...</span>
      </div>
    </div>
  );
};

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
    title: "SAP Labs",
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
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
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
      
      // Map history to the format expected by the API
      // Filter out the initial greeting if it's the first message to ensure history starts with 'user'
      const history = messages
        .filter((_, i) => i > 0 || messages[0].role === 'user')
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: `You are an AI assistant representing Harsh Srivastava. 
            Information about Harsh:
            - Projects: ${PROJECTS.map(p => p.title).join(', ')}
            - Key Experience: SAP Labs Internship
            - Skills: ${SKILLS.map(s => s.items.join(', ')).join(', ')}
            
            Be fun, helpful, and concise. Respond in a way that matches the "Cartoon Pop / Neo-Brutalist" aesthetic of this portfolio—energetic, playful, and expressive like a comic book character!`
        }
      });

      const aiMessage: Message = { role: 'ai', content: response.text || "I apologize, but I am unable to respond at the moment." };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "I encountered a connection issue. Please allow me a moment to recover." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col md:flex-row p-6 md:p-10 lg:p-12 gap-0 overflow-x-hidden relative">
      {/* Background Pattern applied via base CSS */}
      {/* Sidebar */}
      <aside className="w-full md:w-80 lg:w-96 flex flex-col justify-between md:pr-10 lg:pr-12 md:border-r-4 border-ink pb-10 md:pb-0 z-10">        <div className="space-y-12">
          <div className="profile-section flex flex-col items-start">
            <MindBlowingBadge />
            
            <span className="micro-label bg-accent-blue text-black">Software Engineer</span>
            <h1 className="editorial-title">
              Harsh<br />Srivastava
            </h1>
          </div>

          <div className="bio text-ink-dim text-lg font-bold leading-relaxed max-w-xs mt-6 bg-surface cartoon-border p-4 cartoon-shadow relative transform -rotate-2">
            Crafting digital experiences through elegant code and intentional design. Currently focused on exploring AI and scalable apps.
          </div>

          <nav className="mt-8">
            <ul className="space-y-4">
              <li><a href="#projects" className="editorial-nav-link active">Selected Works</a></li>
              <li><a href="#about" className="editorial-nav-link">About Me</a></li>
              <li><a href="#contact" className="editorial-nav-link">Contact</a></li>
              <li><button onClick={() => setIsChatOpen(true)} className="editorial-nav-link text-left">Ask AI Assistant</button></li>
              <li><button onClick={() => setIsTerminalOpen(true)} className="editorial-nav-link text-left flex items-center gap-2">SSH / Curl Tools <span className="inline-block py-0.5 px-1.5 bg-accent-yellow text-black text-[10px] rounded cartoon-border">NEW</span></button></li>
              <li><a href="https://linkedin.com/in/harshsri2208" target="_blank" rel="noreferrer" className="editorial-nav-link">LinkedIn</a></li>
              <li><a href="https://github.com/harshsri2208" target="_blank" rel="noreferrer" className="editorial-nav-link">GitHub</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 md:mt-0 flex flex-col gap-2 font-bold text-black bg-accent-yellow p-4 cartoon-border cartoon-shadow transform rotate-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-accent-green cartoon-border" />
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
            <div className="flex justify-between items-end border-b-4 border-ink pb-4">
              <h2 className="font-serif text-4xl font-bold">Featured Projects</h2>
              <span className="micro-label mb-0 bg-accent !text-white transform rotate-3">01 &mdash; 06</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="cartoon-card group hover:-translate-y-2 hover:-translate-x-2"
                >
                  <span className="micro-label bg-accent-green text-black">{project.tags[0] || "System"}</span>
                  <h3 className="group-hover:text-accent transition-colors flex items-center justify-between font-serif text-2xl font-bold mb-3 text-ink">
                    {project.title}
                    {project.link && <a href={project.link} target="_blank" rel="noreferrer"><ExternalLink size={24} className="text-ink transition-transform group-hover:scale-125" /></a>}
                  </h3>
                  <p className="text-ink-dim font-bold text-base leading-relaxed mb-6 h-12 overflow-hidden line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(1).map(tag => (
                      <span key={tag} className="text-[12px] uppercase tracking-widest text-ink font-bold px-3 py-1 bg-surface cartoon-border">
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
            <div className="flex justify-between items-end border-b-4 border-ink pb-4">
              <h2 className="font-serif text-4xl font-bold">About Me</h2>
              <span className="micro-label mb-0 bg-accent-blue text-black transform -rotate-3">BIOGRAPHY</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 text-ink-dim text-base font-bold leading-relaxed cartoon-card bg-surface">
                <p>
                  I am a Software Engineer based in India, driven by the intersection of complex backends and intuitive interfaces. My journey started with a fascination for automation, which led me to build tools that simplify human interaction with technology.
                </p>
                <p>
                  With a solid foundation in Computer Science, I've had the privilege of working with organizations like SAP Labs, where I honed my skills in enterprise-grade software development. My aspirations lie in architecting scalable distributed systems that empower global communities.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <div className="bg-accent-yellow p-4 cartoon-border transform rotate-1">
                    <span className="micro-label !text-[10px] bg-surface text-ink">AWARDS</span>
                    <ul className="mt-2 text-black font-bold text-sm">
                      <li>• SAP Excellence Intern</li>
                      <li>• Hackathon Winner 2023</li>
                    </ul>
                  </div>
                  <div className="bg-accent p-4 cartoon-border transform -rotate-1 text-black">
                    <span className="micro-label !text-[10px] bg-surface text-ink">EDUCATION</span>
                    <ul className="mt-2 font-bold text-sm">
                      <li>• B.Tech, Computer Science</li>
                      <li>• Specialization in AI/ML</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {SKILLS.map((skill, idx) => (
                  <div key={skill.name} className={`cartoon-card p-6 flex flex-col gap-3 ${idx % 2 === 0 ? 'bg-accent-blue' : 'bg-surface'}`}>
                    <span className={`font-serif text-2xl font-bold ${idx % 2 === 0 ? 'text-black' : 'text-ink'}`}>{skill.name}</span>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map(i => (
                        <span key={i} className="text-sm text-ink font-bold bg-surface cartoon-border px-2 py-1">{i}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-8">
            <div className="flex justify-between items-end border-b-4 border-ink pb-4">
              <h2 className="font-serif text-4xl font-bold">Experience</h2>
            </div>
            
            <div className="space-y-0 cartoon-card bg-surface p-0">
              <div className="exp-row px-8">
                <div>
                  <div className="exp-company">SAP Labs</div>
                  <div className="exp-role text-ink-dim font-bold text-base">Case Study & Internship Prep</div>
                </div>
                <div className="exp-year">2024 &mdash; Pres.</div>
              </div>
              <div className="exp-row px-8 bg-accent-green">
                <div>
                  <div className="exp-company text-black">PyWarriors Community</div>
                  <div className="exp-role text-black text-base font-bold">Lead Developer</div>
                </div>
                <div className="exp-year !text-black">2023 &mdash; 2024</div>
              </div>
              <div className="exp-row px-8 border-none bg-accent-yellow">
                <div>
                  <div className="exp-company text-black">Software Engineering Projects</div>
                  <div className="exp-role text-black font-bold text-base">Full Stack Development</div>
                </div>
                <div className="exp-year !text-black">2022 &mdash; 2023</div>
              </div>
            </div>
          </section>

          {/* Background/Philosophy Section */}
          <section className="space-y-6 max-w-2xl cartoon-card bg-accent text-white">
            <span className="micro-label bg-surface text-ink">Behind the Code</span>
            <p className="font-serif text-3xl font-bold leading-snug">
              "The most powerful technologies are those that disappear into the fabric of daily life."
            </p>
            <p className="text-white text-base font-bold leading-relaxed">
              I believe in software that is as beautiful internally as it is externally. My approach combines the rigor of engineering with the nuance of design, ensuring that every line of code serves a larger narrative.
            </p>
          </section>

          {/* Contact Section */}
          <section id="contact" className="space-y-12">
            <div className="flex justify-between items-end border-b-4 border-ink pb-4">
              <h2 className="font-serif text-4xl font-bold">Get in Touch</h2>
              <span className="micro-label mb-0 bg-accent-yellow text-black">CONTACT</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 cartoon-card bg-accent-blue">
                <p className="text-black text-lg font-bold leading-relaxed">
                  Whether you have a question about my work or just want to say hello, my inbox is always open. Feel free to reach out via the form, or connect through social channels.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-ink font-bold text-lg bg-surface p-3 cartoon-border rounded-xl">
                    <Mail size={24} className="text-accent" />
                    <span>harshsri2208@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-ink font-bold text-lg bg-surface p-3 cartoon-border rounded-xl">
                    <Globe size={24} className="text-accent" />
                    <span>Bangalore, India</span>
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
                className="space-y-6 cartoon-card bg-surface"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="micro-label !text-[10px] bg-accent text-white">NAME</label>
                    <input name="name" required className="w-full bg-surface cartoon-border p-4 text-lg font-bold text-ink outline-none focus:bg-accent-yellow focus:text-black transition-colors rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label !text-[10px] bg-accent text-white">EMAIL</label>
                    <input name="email" type="email" required className="w-full bg-surface cartoon-border p-4 text-lg font-bold text-ink outline-none focus:bg-accent-yellow focus:text-black transition-colors rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="micro-label !text-[10px] bg-accent text-white">MESSAGE</label>
                  <textarea name="message" required rows={4} className="w-full bg-surface cartoon-border p-4 text-lg font-bold text-ink outline-none focus:bg-accent-yellow focus:text-black transition-colors rounded-xl resize-none" />
                </div>
                <button type="submit" className="cartoon-button w-full bg-accent-green hover:-translate-y-1 hover:bg-surface text-black text-xl">
                  Dispatch Message
                </button>
                <p className="text-sm text-ink-dim font-bold italic text-center">
                  This form uses a secure serverless integration to forward messages to my primary address.
                </p>
              </form>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-20 pb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t-4 border-ink mt-20">
            <div className="flex gap-8">
              <a href="https://github.com/harshsri2208" className="text-ink hover:text-accent font-bold uppercase tracking-widest text-sm transition-colors cartoon-border rounded-full px-4 py-2 bg-surface">Github</a>
              <a href="https://linkedin.com/in/harshsri2208" className="text-ink hover:text-accent font-bold uppercase tracking-widest text-sm transition-colors cartoon-border rounded-full px-4 py-2 bg-surface">Linkedin</a>
              <a href="mailto:harshsri2208@gmail.com" className="text-ink hover:text-accent font-bold uppercase tracking-widest text-sm transition-colors cartoon-border rounded-full px-4 py-2 bg-surface">Email</a>
            </div>
            <p className="text-sm text-black uppercase font-bold tracking-[2px] bg-accent-yellow px-4 py-2 cartoon-border rounded-full transform rotate-2">
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
              className="fixed right-0 top-0 h-full w-full max-w-md bg-surface border-l-4 border-ink z-[70] flex flex-col shadow-[-10px_0px_0px_var(--color-shadow)]"
            >
              <div className="p-8 border-b-4 border-ink flex items-center justify-between bg-accent-yellow">
                <div className="flex flex-col">
                  <span className="micro-label mb-1 bg-surface text-ink">Interactive Assistant</span>
                  <h3 className="font-serif text-3xl font-bold text-black">Harsh AI</h3>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="bg-surface rounded-full p-2 cartoon-border cartoon-shadow hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <X size={24} className="text-ink" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-bg">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      m.role === 'user' ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "speech-bubble font-bold text-base leading-relaxed",
                      m.role === 'user' 
                        ? "user-msg" 
                        : "ai-msg"
                    )}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 text-accent font-bold animate-bounce ml-6">
                    <span className="text-sm uppercase tracking-widest italic bg-surface cartoon-border px-4 py-2 rounded-full text-ink">Thinking...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-6 border-t-4 border-ink bg-surface">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything..."
                    className="w-full bg-surface cartoon-border px-5 py-4 rounded-full text-lg font-bold text-ink focus:outline-none focus:bg-bg transition-colors"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                    className="absolute right-2 cartoon-button !px-4 !py-3 !rounded-full bg-accent text-white disabled:opacity-50"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isTerminalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTerminalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-surface cartoon-border cartoon-shadow z-[101] p-6 md:p-10 overflow-y-auto max-h-[90vh] mx-4"
            >
              <button 
                onClick={() => setIsTerminalOpen(false)}
                className="absolute top-6 right-6 p-2 bg-accent text-white rounded-full cartoon-border hover:bg-accent/80 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-accent-yellow rounded-2xl cartoon-border shadow-[4px_4px_0_#000]">
                  <Monitor size={32} className="text-black" />
                </div>
                <div>
                  <h2 className="editorial-subtitle text-3xl mb-1">Terminal Mode</h2>
                  <p className="text-ink-dim font-bold">Access the portfolio via CLI</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                  {/* Curl Box */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-accent-blue text-black flex items-center justify-center text-sm cartoon-border">1</span>
                      Via Curl
                    </h3>
                    <div className="bg-bg cartoon-border p-4 relative group mb-4">
                      <code className="text-accent-blue font-mono text-sm break-all">
                        curl -L {window.location.host}
                      </code>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`curl -L ${window.location.host}`);
                          setCopiedCurl(true);
                          setTimeout(() => setCopiedCurl(false), 2000);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-surface cartoon-border hover:bg-bg transition-colors"
                      >
                        {copiedCurl ? <Check size={16} className="text-accent-green" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <div className="bg-accent-yellow/10 cartoon-border border-accent-yellow p-4 text-xs font-bold text-accent-yellow leading-relaxed">
                      ⚠️ Sandbox Note: AI Studio's "Cookie Check" might block curl. This command works perfectly once you host this app on Render, Railway, or VPS!
                    </div>
                  </div>

                  {/* SSH Box */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-accent-green text-black flex items-center justify-center text-sm cartoon-border">2</span>
                      Via SSH
                    </h3>
                    <div className="bg-bg cartoon-border p-6 space-y-4">
                      <p className="text-ink-dim text-sm font-bold leading-relaxed">
                        GitHub Pages is static. To enable real SSH, you can run the provided server code on any VPS.
                      </p>
                      <div className="flex gap-4">
                        <a 
                          href="https://github.com/harshsri2208/harshsri2208.github.io/blob/main/ssh-server.ts" 
                          target="_blank" 
                          rel="noreferrer"
                          className="cartoon-button bg-bg text-white !py-2 !px-4 !text-sm flex items-center gap-2"
                        >
                          <Terminal size={14} /> Get SSH Server Source
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 uppercase tracking-tighter">
                    Live UI Preview
                  </h3>
                  <TerminalPreview />
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
