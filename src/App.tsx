import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Globe, 
  Database,
  Terminal,
  Briefcase,
  Monitor,
  X,
  Copy,
  Check,
  Download
} from 'lucide-react';

// Types
type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  icon?: React.ReactNode;
};

// Data
const PROJECTS: Project[] = [
  {
    title: "AnomalyDetection_CVPR18",
    description: "Implementation of Real-World Anomaly Detection CVPR_2018 paper. Built utilizing advanced computer vision concepts.",
    tags: ["Computer Vision", "Machine Learning", "Research"],
    link: "https://github.com/harshsri2208/AnomalyDetection_CVPR18",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: "Expense Tracker",
    description: "Expense tracking app using Spring Boot for the robust backend and React for the dynamic frontend interface.",
    tags: ["React", "Spring Boot", "Full-Stack"],
    link: "https://github.com/harshsri2208/expense-tracker",
    icon: <Database className="w-5 h-5" />,
  },
  {
    title: "Giftable-CSR-Hackathon",
    description: "Coin classifier utilizing React for UI and Django for the backend, built as part of a CSR hackathon.",
    tags: ["Python", "Django", "React"],
    link: "https://github.com/harshsri2208/Giftable-CSR-Hackathon",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    title: "Cab Management",
    description: "Database management system project built in Java to efficiently handle cab booking and dispatching routes.",
    tags: ["Java", "DBMS", "Software Engineering"],
    link: "https://github.com/harshsri2208/cab-management",
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    title: "File Backup Automation",
    description: "Linux based shell automation script for streamlining robust file backup operations on local and remote servers.",
    tags: ["Linux", "Shell Scripting", "DevOps"],
    link: "https://github.com/harshsri2208/file-backup-automation",
    icon: <Terminal className="w-5 h-5" />,
  },
  {
    title: "ChatApp",
    description: "Java-based chatting application focusing on real-time client-server communication and socket programming.",
    tags: ["Java", "Networking", "Sockets"],
    link: "https://github.com/harshsri2208/ChatApp",
    icon: <Code2 className="w-5 h-5" />,
  }
];

const SKILLS = [
  { name: "Languages", items: ["Python", "Java", "TypeScript", "JavaScript", "C++", "SQL"] },
  { name: "Frontend", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Redux"] },
  { name: "Backend", items: ["Node.js", "Express", "Spring Boot", "Django", "REST APIs"] },
  { name: "Tools & ML", items: ["Git/GitHub", "Docker", "Linux", "Scikit-Learn", "TensorFlow"] }
];

const MindBlowingBadge = () => {
  return (
    <div className="relative group w-48 h-48 md:w-56 md:h-56">
      <div className="absolute -inset-2 bg-accent-yellow transform -rotate-3 cartoon-border rounded-[2rem] w-full h-full -z-10 group-hover:-rotate-6 transition-transform duration-300" />
      <div className="w-full h-full rounded-3xl cartoon-border bg-accent cartoon-shadow relative overflow-hidden flex items-center justify-center transition-shadow duration-300 group-hover:shadow-[12px_12px_0_var(--color-shadow)]">
        <img 
          src="/me.jpg" 
          alt="Harsh Srivastava" 
          className="w-full h-full object-cover cartoon-image"
        />
        <div className="absolute bottom-2 right-2 bg-accent-yellow text-black font-black text-lg md:text-xl px-2 py-1 rotate-[-12deg] cartoon-border shadow-[4px_4px_0_#000] z-20">
          HARSH!
        </div>
      </div>
    </div>
  );
};

const TerminalPreview = () => {
  return (
    <div className="bg-[#0c0c0c] cartoon-border p-4 md:p-6 font-mono text-[10px] md:text-xs leading-none overflow-x-auto select-none rounded-xl">
      <pre className="text-accent-blue whitespace-pre font-mono">
{`╔═════════════════════════════════════════════════════════╗
║                                                         ║
║   ██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗              ║
║   ██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║              ║
║   ███████║███████║██████╔╝███████╗███████║              ║
║   ██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║              ║
║   ██║  ██║██║  ██║██║  ██║███████║██║  ██║              ║
║   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝              ║
║                                                         ║
║   SRIVASTAVA | Software Engineer                        ║
║                                                         ║
╚═════════════════════════════════════════════════════════╝

── ABOUT ──────────────────────────────────────────────────
Crafting digital experiences through elegant code and 
intentional design.

── PROJECTS ───────────────────────────────────────────────
• AnomalyDetection_CVPR18
• Expense Tracker
• Cab Management

── CONNECT ────────────────────────────────────────────────
• GitHub:   https://github.com/harshsri2208
• LinkedIn: https://linkedin.com/in/harshsri2208
• Email:    harshsri2208@gmail.com`}
      </pre>
    </div>
  );
};

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col md:flex-row p-6 md:p-12 lg:p-20 gap-12 max-w-[1600px] mx-auto selection:bg-accent selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 lg:w-80 flex flex-col justify-between shrink-0 h-fit sticky top-20">
        <div className="space-y-12">
          <div className="profile-section flex flex-col items-start">
            <MindBlowingBadge />
            <div className="mt-8">
              <h1 className="editorial-title mb-2">Harsh</h1>
              <p className="font-serif text-3xl font-bold text-accent-blue">Srivastava</p>
            </div>
            <div className="bio text-ink-dim text-lg font-bold leading-relaxed max-w-xs mt-6 bg-surface cartoon-border p-4 cartoon-shadow relative transform -rotate-2">
              Software Engineer crafting intelligent backends and dynamic web systems.
            </div>
          </div>
          
          <nav className="hidden md:block">
            <ul className="space-y-4">
              <li><a href="#projects" className="editorial-nav-link active">Selected Works</a></li>
              <li><a href="#about" className="editorial-nav-link">About Me</a></li>
              <li><a href="#contact" className="editorial-nav-link">Contact</a></li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert('In a live deployment, this will download your actual Resume PDF.'); }} 
                  className="editorial-nav-link flex items-center gap-2"
                >
                  Download Resume <span className="inline-block py-0.5 px-1.5 bg-accent-blue text-black text-[10px] rounded cartoon-border">PDF</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setIsTerminalOpen(true)} 
                  className="editorial-nav-link text-left flex items-center gap-2"
                >
                  SSH / Curl Tools <span className="inline-block py-0.5 px-1.5 bg-accent-yellow text-black text-[10px] rounded cartoon-border">NEW</span>
                </button>
              </li>
              <li><a href="https://linkedin.com/in/harshsri2208" target="_blank" rel="noreferrer" className="editorial-nav-link">LinkedIn</a></li>
              <li><a href="https://github.com/harshsri2208" target="_blank" rel="noreferrer" className="editorial-nav-link">GitHub</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 md:mt-0 flex flex-col gap-2 font-bold text-black bg-accent-yellow p-4 cartoon-border cartoon-shadow transform rotate-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-accent-green cartoon-border animate-pulse" />
            <span className="text-xs uppercase tracking-wider">Status</span>
          </div>
          <span className="text-sm">Available for Opportunities</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pb-24 space-y-24">
        {/* Projects Section */}
        <section id="projects" className="space-y-12">
          <div className="flex justify-between items-end border-b-4 border-ink pb-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold">Selected Works</h2>
            <span className="micro-label mb-0 bg-accent text-white">PROJECTS</span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="cartoon-card group hover:-translate-y-2 hover:-translate-x-2"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-accent-blue text-black rounded-2xl cartoon-border shadow-[3px_3px_0_#000]">
                    {project.icon}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-surface cartoon-border rounded-full hover:bg-accent hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink mb-3 group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-ink-dim font-bold text-base leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold">About Me</h2>
            <span className="micro-label mb-0 bg-accent-blue text-black">PROFILE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6 text-ink-dim text-base font-bold leading-relaxed cartoon-card bg-surface">
              <p>
                I am a Software Engineer based in India, driven by the intersection of complex backends and intuitive interfaces. My journey started with a fascination for automation, which led me to build tools that simplify human interaction with technology.
              </p>
              <p>
                With expertise in Python, Java, and React, I specialize in architecting scalable systems and developing machine learning pipelines. When I'm not optimizing algorithms, I'm exploring new frameworks or contributing to open source.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <div className="bg-accent-yellow p-4 cartoon-border transform rotate-1 flex-1">
                  <span className="text-xs uppercase tracking-wider text-black block font-black">Role</span>
                  <span className="text-lg text-black font-black">Software Engineer</span>
                </div>
                <div className="bg-accent p-4 cartoon-border transform -rotate-1 text-black flex-1">
                  <span className="text-xs uppercase tracking-wider text-white block font-black">Location</span>
                  <span className="text-lg text-white font-black">Bangalore, India</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert('In a live deployment, this will download your actual Resume PDF.'); }}
                  className="cartoon-button bg-accent-green hover:-translate-y-1 hover:bg-surface text-black text-lg w-full text-center flex items-center justify-center gap-2"
                >
                  <Download size={20} /> Download Full Resume PDF
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="cartoon-card bg-surface">
                <h3 className="font-serif text-2xl font-bold text-ink mb-6 flex items-center gap-2">
                  <Briefcase className="text-accent" /> Experience
                </h3>
                <div className="space-y-4">
                  <div className="exp-row">
                    <div>
                      <div className="exp-company">SAP Labs</div>
                      <div className="text-ink-dim font-bold text-sm">Software Engineering Intern</div>
                    </div>
                    <div className="exp-year">2023</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SKILLS.map((skill, idx) => (
                  <div key={skill.name} className={`cartoon-card p-6 flex flex-col gap-3 ${idx % 2 === 0 ? 'bg-accent-blue' : 'bg-surface'}`}>
                    <h4 className="font-serif text-xl font-bold text-black">{skill.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map(i => (
                        <span key={i} className="text-sm text-ink font-bold bg-surface cartoon-border px-2 py-1">{i}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Behind the Code Section */}
        <section className="space-y-6 max-w-2xl cartoon-card bg-accent text-white">
          <span className="micro-label bg-surface text-ink">Behind the Code</span>
          <p className="font-serif text-3xl font-bold leading-snug">
            Code is the canvas, architecture is the art. Crafting systems with scale, clarity, and bold character.
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
              action="https://formspree.io/f/mnjlvjrp"
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                
                // Client-side email validation
                const email = formData.get('email') as string;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email && !emailRegex.test(email)) {
                  alert("Please provide a valid email address.");
                  return;
                }
                
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
            <a href="https://github.com/harshsri2208" target="_blank" rel="noreferrer" className="text-ink hover:text-accent font-bold uppercase tracking-widest text-sm transition-colors cartoon-border rounded-full px-4 py-2 bg-surface">Github</a>
            <a href="https://linkedin.com/in/harshsri2208" target="_blank" rel="noreferrer" className="text-ink hover:text-accent font-bold uppercase tracking-widest text-sm transition-colors cartoon-border rounded-full px-4 py-2 bg-surface">Linkedin</a>
            <a href="mailto:harshsri2208@gmail.com" className="text-ink hover:text-accent font-bold uppercase tracking-widest text-sm transition-colors cartoon-border rounded-full px-4 py-2 bg-surface">Email</a>
          </div>
          <p className="text-sm text-black uppercase font-bold tracking-[2px] bg-accent-yellow px-4 py-2 cartoon-border rounded-full transform rotate-2">
            &copy; 2026 Harsh Srivastava
          </p>
        </footer>
      </main>

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
                  <h2 className="editorial-title text-3xl mb-1">Terminal Mode</h2>
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
                        curl -L {typeof window !== 'undefined' ? window.location.host : ''}
                      </code>
                      <button 
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            navigator.clipboard.writeText(`curl -L ${window.location.host}`);
                            setCopiedCurl(true);
                            setTimeout(() => setCopiedCurl(false), 2000);
                          }
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
