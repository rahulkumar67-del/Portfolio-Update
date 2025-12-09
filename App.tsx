import React, { useState, useEffect, useMemo, useRef } from 'react';
import { content } from './content';
import Modal from './components/Modal';
import { Project, Service, Testimonial } from './types';

// --- Icons (Inline SVG for performance) ---
const Icons = {
  Github: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  Linkedin: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  Instagram: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  Star: () => <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>,
  Menu: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
};

// --- Helper Components ---

const Logo = () => (
  <div className="flex items-center gap-2 group select-none">
    <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-indigo-800 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
      R
    </div>
    <div className="flex flex-col">
      <span className="text-lg font-bold text-slate-900 leading-none group-hover:text-primary transition-colors">Rahul</span>
      <span className="text-xs text-slate-500 font-medium tracking-widest uppercase leading-none">Kumar</span>
    </div>
  </div>
);

const Section = ({ id, className = "", children }: { id: string, className?: string, children?: React.ReactNode }) => (
  <section id={id} className={`py-20 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

const Button = ({ variant = 'primary', className = "", children, ...props }: ButtonProps) => {
  const baseStyle = "px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform active:scale-95";
  const variants = {
    primary: "bg-primary text-white hover:bg-indigo-700 hover:shadow-lg shadow-indigo-500/30",
    secondary: "bg-white text-slate-800 border border-slate-200 hover:border-primary hover:text-primary",
    outline: "border-2 border-white/30 text-white hover:bg-white/10"
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Sub-Features ---

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'skills' | 'experience' | 'education'>('skills');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Testimonials state with local storage persistence
  const [localReviews, setLocalReviews] = useLocalStorage<Testimonial[]>('portfolio_reviews', []);
  const allReviews = useMemo(() => [...content.testimonials, ...localReviews], [localReviews]);
  
  // Simple form state
  const [reviewForm, setReviewForm] = useState({ name: '', role: '', text: '', rating: 5 });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Stats
  const avgRating = useMemo(() => {
    if (allReviews.length === 0) return 0;
    return (allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length).toFixed(1);
  }, [allReviews]);

  // Project Filtering (simple example, can be expanded)
  const [filter, setFilter] = useState('All');
  const categories = useMemo(() => ['All', ...new Set(content.projects.map(p => p.category))], []);
  const filteredProjects = useMemo(() => {
    if (filter === 'All') return content.projects;
    return content.projects.filter(p => p.category === filter);
  }, [filter]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Testimonial = {
      id: Date.now().toString(),
      ...reviewForm
    };
    setLocalReviews([...localReviews, newReview]);
    setShowReviewForm(false);
    setReviewForm({ name: '', role: '', text: '', rating: 5 });
    alert("Thanks for your feedback!");
  };

  const NavLink = ({ href, children }: { href: string, children?: React.ReactNode }) => (
    <a 
      href={href} 
      onClick={() => setMobileMenuOpen(false)}
      className="text-slate-600 hover:text-primary font-medium transition-colors"
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <a href="#" aria-label="Home">
            <Logo />
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            <NavLink href="#hero">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#portfolio">Work</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            <Icons.Menu />
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 p-4 flex flex-col gap-4 shadow-xl">
            <NavLink href="#hero">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#portfolio">Work</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <Section id="hero" className="pt-32 md:pt-48 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 animate-in slide-in-from-left duration-700">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-primary rounded-full text-sm font-semibold tracking-wide">
            {content.personal.role}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            {content.hero.headline}
          </h1>
          <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
            {content.hero.subheadline}
          </p>
          <div className="flex gap-4 pt-4">
            <Button onClick={() => document.getElementById('portfolio')?.scrollIntoView({behavior: 'smooth'})}>
              View Work
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
              Contact Me
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end animate-in fade-in duration-1000">
           {/* Abstract graphical representation instead of generic user image for a lighter feel */}
           <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-primary to-purple-500 rounded-2xl rotate-3 shadow-2xl flex items-center justify-center text-white/20">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
           </div>
        </div>
      </Section>

      {/* --- About Section --- */}
      <Section id="about" className="bg-white rounded-3xl my-8 shadow-sm">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
             <h2 className="text-3xl font-bold mb-6">About Me</h2>
             <p className="text-slate-600 mb-6 leading-relaxed">
               {content.personal.bioLong}
             </p>
             <div className="flex gap-4">
               <a href={content.personal.socials.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors"><Icons.Github /></a>
               <a href={content.personal.socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary transition-colors"><Icons.Linkedin /></a>
               <a href={content.personal.socials.instagram} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors"><Icons.Instagram /></a>
             </div>
          </div>

          <div>
            <div className="flex gap-6 border-b border-slate-200 mb-6">
              {(['skills', 'experience', 'education'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                    activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="min-h-[300px]">
              {activeTab === 'skills' && (
                <div className="flex flex-wrap gap-2">
                  {content.skills.map((skill) => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6">
                  {content.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100">
                      <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary"></div>
                      <h4 className="font-bold text-slate-900">{exp.role}</h4>
                      <p className="text-sm text-primary mb-1">{exp.company} • {exp.period}</p>
                      <p className="text-sm text-slate-600 mb-2">{exp.description}</p>
                      {exp.link && (
                        <a href={exp.link} target="_blank" rel="noreferrer" className="text-xs text-primary underline hover:text-indigo-800">
                          {exp.linkText || "View Certificate"}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-6">
                  {content.education.map((edu) => (
                    <div key={edu.id}>
                      <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                      <p className="text-sm text-slate-500 mb-1">{edu.school} • {edu.period}</p>
                      <ul className="list-disc list-inside text-sm text-slate-600">
                        {edu.details.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* --- Services Section --- */}
      <Section id="services">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Services</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">High-quality development services tailored to your needs.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {content.services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="w-12 h-12 bg-indigo-50 text-primary rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {/* FontAwesome Icon with fallback */}
                <i className={`fa-solid ${service.icon}`}></i> 
                {!service.icon && <span>🛠</span>}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm">{service.shortDesc}</p>
              <span className="text-primary text-sm font-medium mt-4 inline-block group-hover:underline">Learn more →</span>
            </div>
          ))}
        </div>
      </Section>

      {/* --- Portfolio Section --- */}
      <Section id="portfolio" className="bg-slate-900 text-white rounded-3xl py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Selected Work</h2>
            <p className="text-slate-400">A collection of projects exploring VR, Simulation, and Game Design.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                  filter === cat ? 'bg-primary text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.thumb} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-lg">{project.title}</h3>
                   <span className="text-xs font-mono text-slate-400">{project.year}</span>
                </div>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded text-slate-300">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* --- Testimonials Section --- */}
      <Section id="testimonials">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
           <div>
             <h2 className="text-3xl font-bold">Feedback</h2>
             <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold">{avgRating}</span>
                <div className="flex text-yellow-400"><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /></div>
                <span className="text-slate-500 text-sm">({allReviews.length} reviews)</span>
             </div>
           </div>
           <Button variant="secondary" className="mt-4 md:mt-0" onClick={() => setShowReviewForm(!showReviewForm)}>
             {showReviewForm ? 'Cancel' : 'Leave Review'}
           </Button>
        </div>

        {showReviewForm && (
           <form onSubmit={handleReviewSubmit} className="mb-12 bg-white p-6 rounded-xl border border-slate-200 animate-in slide-in-from-top-4">
             <div className="grid md:grid-cols-2 gap-4 mb-4">
               <input 
                 required 
                 placeholder="Your Name" 
                 className="p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                 value={reviewForm.name}
                 onChange={e => setReviewForm({...reviewForm, name: e.target.value})}
               />
               <input 
                 required 
                 placeholder="Role / Company" 
                 className="p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                 value={reviewForm.role}
                 onChange={e => setReviewForm({...reviewForm, role: e.target.value})}
               />
             </div>
             <div className="mb-4">
                <label className="text-sm text-slate-500 block mb-1">Rating: {reviewForm.rating}/5</label>
                <input 
                  type="range" min="1" max="5" step="1" 
                  className="w-full"
                  value={reviewForm.rating}
                  onChange={e => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
                />
             </div>
             <textarea 
               required 
               rows={3} 
               placeholder="Your feedback..." 
               className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
               value={reviewForm.text}
               onChange={e => setReviewForm({...reviewForm, text: e.target.value})}
             ></textarea>
             <Button type="submit">Submit Review</Button>
           </form>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
               <div className="flex gap-1 mb-3">
                 {[...Array(5)].map((_, i) => (
                   <span key={i} className={i < t.rating ? "text-yellow-400" : "text-slate-200"}>★</span>
                 ))}
               </div>
               <p className="text-slate-600 text-sm mb-4 italic">"{t.text}"</p>
               <div>
                 <p className="font-bold text-slate-900">{t.name}</p>
                 <p className="text-xs text-slate-500">{t.role}</p>
               </div>
            </div>
          ))}
        </div>
      </Section>

      {/* --- Contact Section --- */}
      <Section id="contact" className="bg-white rounded-t-3xl border-t border-slate-200 mt-12 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-slate-600 mb-8">
            Interested in working together? Drop me a line for game dev, VR prototyping, or simulation projects.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
             <a href={`mailto:${content.personal.email}`} className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
               <span className="text-2xl">✉️</span>
               <div className="text-left">
                 <div className="text-xs text-slate-500">Email</div>
                 <div className="font-medium">{content.personal.email}</div>
               </div>
             </a>
             <a href={`tel:${content.personal.phone}`} className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
               <span className="text-2xl">📱</span>
               <div className="text-left">
                 <div className="text-xs text-slate-500">Phone</div>
                 <div className="font-medium">{content.personal.phone}</div>
               </div>
             </a>
          </div>
          
          <div className="flex justify-center gap-8">
            <a href={content.personal.socials.github} className="text-slate-400 hover:text-slate-900 hover:scale-110 transition-all"><Icons.Github /></a>
            <a href={content.personal.socials.linkedin} className="text-slate-400 hover:text-primary hover:scale-110 transition-all"><Icons.Linkedin /></a>
            <a href={content.personal.socials.instagram} className="text-slate-400 hover:text-pink-600 hover:scale-110 transition-all"><Icons.Instagram /></a>
          </div>
          
          <div className="mt-12 flex justify-center">
             <div className="opacity-70 scale-90">
               <Logo />
             </div>
          </div>
          <p className="mt-4 text-sm text-slate-400">© {new Date().getFullYear()} {content.personal.name}. Built with React & Tailwind.</p>
        </div>
      </Section>

      {/* --- Modals --- */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <div className="space-y-6">
            <img src={selectedProject.thumb} alt="" className="w-full rounded-xl object-cover" />
            
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700">{tag}</span>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg">
              <div><span className="text-slate-500">Role:</span> <span className="font-medium block">{selectedProject.role}</span></div>
              <div><span className="text-slate-500">Year:</span> <span className="font-medium block">{selectedProject.year}</span></div>
            </div>

            <p className="text-slate-600 leading-relaxed">{selectedProject.description}</p>
            
            {/* Gallery Grid (Simple) */}
            {selectedProject.images.length > 0 && (
               <div className="grid grid-cols-2 gap-2 mt-4">
                 {selectedProject.images.map((img, i) => (
                   <img key={i} src={img} alt="" className="rounded-lg w-full h-32 object-cover" loading="lazy" />
                 ))}
               </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-slate-100">
               {selectedProject.repo && (
                 <a href={selectedProject.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-primary font-medium">
                   <Icons.Github /> View Code
                 </a>
               )}
               {selectedProject.link && (
                 <a href={selectedProject.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-primary font-medium">
                   <span className="text-xl">🔗</span> Live Demo
                 </a>
               )}
            </div>
          </div>
        )}
      </Modal>

      <Modal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        title={selectedService?.title || ''}
      >
        {selectedService && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-indigo-50 text-primary rounded-2xl flex items-center justify-center text-3xl">
                <i className={`fa-solid ${selectedService.icon}`}></i>
                {!selectedService.icon && <span>🛠</span>}
              </div>
              <p className="text-lg text-slate-600 font-medium">{selectedService.shortDesc}</p>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">{selectedService.fullDesc}</p>
            <h4 className="font-bold mb-3">What I deliver:</h4>
            <ul className="space-y-2">
              {selectedService.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-600">
                  <span className="text-green-500">✓</span> {feat}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <Button onClick={() => { setSelectedService(null); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}); }}>
                Request Quote
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}