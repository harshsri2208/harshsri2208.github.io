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
import { cn } from './lib/utils'; // wait, does this exist? If not I'll remove cn or define it

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

const Avatar = () => (
  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
    <img 
      src="https://api.dicebear.com/7.x/notionists/svg?seed=Harsh&backgroundColor=e2e8f0" 
      alt="Harsh Srivastava" 
      className="w-full h-full object-cover" 
    />
  </div>
);

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col md:flex-row p-6 md:p-12 lg:p-20 gap-12 max-w-[1600px] mx-auto">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 lg:w-80 flex flex-col justify-between shrink-0 h-fit sticky top-20">
        <div className="space-y-12">
          <div className="profile-section flex flex-col items-start gap-6">
            <Avatar />
            <div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-gray-900 mb-2">Harsh Srivastava</h1>
              <p className="font-sans text-lg font-medium text-blue-600">Software Engineer</p>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <ul className="space-y-4">
              <li><a href="#about" className="font-sans text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-wider">About Me</a></li>
              <li><a href="#projects" className="font-sans text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-wider">Selected Works</a></li>
              <li><a href="#contact" className="font-sans text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-wider">Contact</a></li>
              <li className="pt-4">
                <a href="#" onClick={(e) => { e.preventDefault(); alert('In a live deployment, this will download your actual Resume PDF.'); }} className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  <Download size={16} /> Download Resume
                </a>
              </li>
              <li className="pt-2">
                <button onClick={() => setIsTerminalOpen(true)} className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  <Terminal size={16} /> SSH / Curl Tools
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="hidden md:flex gap-6 mt-16">
          <a href="https://github.com/harshsri2208" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors"><Github size={24} /></a>
          <a href="https://linkedin.com/in/harshsri2208" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors"><Linkedin size={24} /></a>
          <a href="mailto:harshsri2208@gmail.com" className="text-gray-400 hover:text-red-500 transition-colors"><Mail size={24} /></a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pb-24 space-y-24">
        
        {/* About Section */}
        <section id="about" className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4 max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-gray-900">About Me</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="leading-relaxed">
                I am a Software Engineer based in India, driven by the intersection of complex backends and intuitive interfaces. My journey started with a fascination for automation, which led me to build tools that simplify human interaction with technology.
              </p>
              <p className="leading-relaxed">
                With expertise in Python, Java, and React, I specialize in architecting scalable systems and developing machine learning pipelines. When I'm not optimizing algorithms, I'm exploring new frameworks or contributing to open source.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Experience</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">SAP Labs</h4>
                    <p className="text-sm text-gray-500">Software Engineering Intern</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">2023</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.flatMap(s => s.items).slice(0, 8).map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-700">
                    {skill}
                  </span>
                ))}
                <span className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-400">+{SKILLS.flatMap(s=>s.items).length - 8} more</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-10">
          <h2 className="font-serif text-3xl font-bold text-gray-900">Selected Works</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 h-16 overflow-hidden">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-10">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Whether you have a question about my work or just want to say hello, my inbox is always open.
            </p>
            
            <form 
              action="https://formspree.io/f/mnjlvjrp"
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                
                const email = formData.get('email') as string;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email && !emailRegex.test(email)) {
                  alert("Please provide a valid email address.");
                  return;
                }
                
                if (form.action.includes('placeholder')) {
                  alert("Demo: In a live deployment, this would send a message to your email via Formspree!");
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
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</label>
                  <input name="name" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                  <input name="email" type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message</label>
                <textarea name="message" required rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none" />
              </div>
              <button type="submit" className="w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm">
                <Mail size={18} /> Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Mobile Footer */}
        <footer className="md:hidden border-t border-gray-200 pt-8 mt-12 flex flex-col items-center gap-6">
          <div className="flex gap-6">
            <a href="https://github.com/harshsri2208" className="text-gray-400 hover:text-gray-900"><Github size={24} /></a>
            <a href="https://linkedin.com/in/harshsri2208" className="text-gray-400 hover:text-blue-600"><Linkedin size={24} /></a>
            <a href="mailto:harshsri2208@gmail.com" className="text-gray-400 hover:text-red-500"><Mail size={24} /></a>
          </div>
          <p className="text-sm text-gray-500">© 2026 Harsh Srivastava</p>
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
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                    <Monitor size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Developer Tools</h3>
                    <p className="text-xs text-gray-500">Access portfolio via CLI</p>
                  </div>
                </div>
                <button onClick={() => setIsTerminalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-lg border border-gray-100 shadow-sm transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-8 space-y-8">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs">1</span>
                    cURL Access
                  </h4>
                  <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between group">
                    <code className="text-green-400 font-mono text-sm">curl -L {window.location.host}</code>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`curl -L ${window.location.host}`);
                        setCopiedCurl(true);
                        setTimeout(() => setCopiedCurl(false), 2000);
                      }}
                      className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                      {copiedCurl ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-xs">2</span>
                    SSH Server Source
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">GitHub Pages is static. To enable real SSH access, deploy the Node server on a VPS.</p>
                  <a href="https://github.com/harshsri2208/harshsri2208.github.io/blob/main/ssh-server.ts" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
                    <Terminal size={16} /> View Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
