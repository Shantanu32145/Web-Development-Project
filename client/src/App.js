import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Moon, Sun, Briefcase, Plus, Code, Layers, Cloud, Mail, ArrowRight } from 'lucide-react';
import './App.css';

const API_URL = "https://my-portfolio-backend-e8mp.onrender.com/api/projects";

const FEATURED = [
  { id: 'f1', title: 'Portfolio CMS', desc: 'A full-stack content management system built with React & Node.js.', img: '/project1.jpg', tag: 'Web Dev' },
  { id: 'f2', title: 'Design System', desc: 'Component library and design tokens for scalable UI development.', img: '/project2.jpg', tag: 'Design' },
  { id: 'f3', title: 'Cloud Dashboard', desc: 'Real-time infrastructure monitoring and deployment pipeline UI.', img: '/project3.jpg', tag: 'Cloud' },
];

const SERVICES = [
  { icon: <Code size={28}/>, title: 'Frontend Dev', desc: 'React, animations, pixel-perfect UI from any design file.' },
  { icon: <Layers size={28}/>, title: 'UI/UX Design', desc: 'Wireframes, prototypes, and design systems in Figma.' },
  { icon: <Cloud size={28}/>, title: 'Cloud & DevOps', desc: 'Deployment pipelines, hosting, CI/CD on AWS & Vercel.' },
  { icon: <Briefcase size={28}/>, title: 'Consulting', desc: 'Code reviews, architecture planning, and team workshops.' },
];

const TECH = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Git', color: '#F05032' },
  { name: 'Tailwind', color: '#38BDF8' },
];

function App() {
  const [view, setView] = useState('portfolio');
  const [darkMode, setDarkMode] = useState(false);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'Design' });
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(setProjects).catch(() => {});
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.body.classList.toggle('dark', next);
  };

  const handlePublish = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(newProject => {
        setProjects([...projects, newProject]);
        setFormData({ title: '', content: '', category: 'Design' });
        alert("Project published successfully!");
      });
  };

  const categories = ['All', 'Design', 'Web Dev', 'Cloud'];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="nav-bar">
        <div className="logo">CREATIVE.</div>
        <div className="nav-links">
          <button className={view === 'portfolio' ? 'active' : ''} onClick={() => setView('portfolio')}>Portfolio</button>
          <button className={view === 'admin' ? 'active' : ''} onClick={() => setView('admin')}>Manage</button>
          <button onClick={toggleTheme} style={{ padding: '8px 12px' }}>
            {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
        </div>
      </nav>

      {view === 'portfolio' ? (
        <div className="portfolio-page">

          {/* HERO */}
          <header className="hero">
            <div className="hero-inner">
              <div className="hero-text">
                <span className="hero-badge">Available for freelance</span>
                <h1>Building digital<br/><span>experiences.</span></h1>
                <p>Product Designer & Full Stack Developer based in India.<br/>I turn ideas into fast, beautiful, and scalable products.</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
                  <button className="btn-gradient" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                    View Work <ArrowRight size={16} style={{ marginLeft: 6, verticalAlign: 'middle' }}/>
                  </button>
                  <button className="btn-outline" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                    Contact Me
                  </button>
                </div>
              </div>
              <div className="hero-image">
                <img src="/me.jpeg" alt="Profile" className="hero-photo"/>
                <div className="hero-card-float card-float-1">
                  <span style={{ fontSize: '1.4rem' }}>🚀</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>50+ Projects</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Delivered</div>
                  </div>
                </div>
                <div className="hero-card-float card-float-2">
                  <span style={{ fontSize: '1.4rem' }}>⭐</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>5.0 Rating</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Client reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* TECH STRIP */}
          <section className="tech-strip">
            <p className="strip-label">Technologies I work with</p>
            <div className="tech-list">
              {TECH.map(t => (
                <span key={t.name} className="tech-badge" style={{ '--dot': t.color }}>
                  <span className="tech-dot"/>
                  {t.name}
                </span>
              ))}
            </div>
          </section>

          <section className="content">

            {/* ABOUT */}
            <div className="about-grid">
              <div className="card about-card">
                <img src="/me.jpeg" alt="Profile" className="about-photo"/>
                <div>
                  <h2>About Me</h2>
                  <p style={{ marginTop: '12px', fontSize: '1.05rem', lineHeight: '1.75' }}>
                    I specialize in building minimalist, performant, and high-quality web applications.
                    Passionate about UI/UX and clean code — I bridge the gap between design and engineering.
                  </p>
                  <p style={{ marginTop: '12px', fontSize: '1rem', lineHeight: '1.75' }}>
                    Currently pursuing my degree while freelancing. Open to internships and collaborations.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
                    {['React', 'Node.js', 'Figma', 'Cloud', 'MongoDB', 'AWS'].map(s => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="about-stats">
                {[
                  { num: '50+', label: 'Projects completed' },
                  { num: '3+', label: 'Years experience' },
                  { num: '20+', label: 'Happy clients' },
                  { num: '5k+', label: 'GitHub commits' },
                ].map(s => (
                  <div key={s.label} className="card about-stat-box">
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICES */}
            <div className="section-header">
              <h2>What I Do</h2>
              <p>End-to-end product development from concept to deployment.</p>
            </div>
            <div className="services-grid">
              {SERVICES.map(s => (
                <div key={s.title} className="card service-card">
                  <div className="service-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p style={{ marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.65' }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* FEATURED PROJECTS */}
            <div id="projects" className="section-header">
              <h2>Featured Projects</h2>
              <p>A selection of my best work.</p>
            </div>
            <div className="featured-grid">
              {FEATURED.map(p => (
                <div key={p.id} className="card featured-card">
                  <div className="featured-img-wrap">
                    <img src={p.img} alt={p.title} className="featured-img"
                      onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                    <div className="featured-img-placeholder" style={{ display: 'none' }}>
                      <Briefcase size={32} color="var(--primary)"/>
                    </div>
                  </div>
                  <div className="featured-body">
                    <span className="tag" style={{ marginBottom: '10px', display: 'inline-block' }}>{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p style={{ marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.65' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* DYNAMIC PROJECTS FROM BACKEND */}
            {projects.length > 0 && (
              <>
                <div className="section-header" style={{ marginTop: '60px' }}>
                  <h2>Recent Publications</h2>
                  <div className="filter-row">
                    {categories.map(c => (
                      <button key={c} className={`filter-btn${filter === c ? ' active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
                    ))}
                  </div>
                </div>
                <div className="grid">
                  {filtered.map(p => (
                    <div key={p.id} className="card">
                      <div style={{ color: 'var(--primary)', marginBottom: '12px' }}><Briefcase size={22}/></div>
                      <span className="tag" style={{ marginBottom: '10px', display: 'inline-block' }}>{p.category}</span>
                      <h3 style={{ marginTop: '8px' }}>{p.title}</h3>
                      <div dangerouslySetInnerHTML={{ __html: p.content }} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '10px' }}/>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* CONTACT */}
            <section id="contact" className="contact-section">
              <div className="card contact-card">
                <div className="contact-left">
                  <h2>Let's work together.</h2>
                  <p style={{ marginTop: '14px', fontSize: '1.05rem', lineHeight: '1.75' }}>
                    Have a project in mind? I'm currently available for freelance work and internships.
                    Drop me a message and I'll get back to you within 24 hours.
                  </p>
                  <div style={{ display: 'flex', gap: '14px', marginTop: '28px' }}>
                    
                    <a href="mailto:hello@example.com" className="social-btn"><Mail size={20}/></a>
                  </div>
                </div>
                <div className="contact-right">
                  <input placeholder="Your name" className="contact-input"/>
                  <input placeholder="Your email" className="contact-input"/>
                  <textarea placeholder="Tell me about your project..." rows={4} className="contact-input" style={{ resize: 'vertical' }}/>
                  <button className="btn-gradient" style={{ width: '100%', marginTop: '4px' }}>
                    Send Message <Mail size={16} style={{ marginLeft: 8, verticalAlign: 'middle' }}/>
                  </button>
                </div>
              </div>
            </section>

          </section>
        </div>

      ) : (
        /* ADMIN PANEL */
        <div className="content" style={{ paddingTop: '120px' }}>
          <div className="stats-row">
            <div className="stat-box"><h2>{projects.length}</h2><p>Projects</p></div>
            <div className="stat-box"><h2>Online</h2><p>Status</p></div>
            <div className="stat-box"><h2>2.4k</h2><p>Visits</p></div>
          </div>
          <div className="card form-card">
            <h2><Plus size={22}/> New Publication</h2>
            <input
              placeholder="Project Name"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
            <select onChange={e => setFormData({ ...formData, category: e.target.value })} value={formData.category}>
              <option>Design</option>
              <option>Web Dev</option>
              <option>Cloud</option>
            </select>
            <Editor
              apiKey="ucoukltcvy9uhjf69575hnc5d4hfbppz2jz0l32luv29yp5t"
              init={{
                height: 300,
                menubar: false,
                skin: darkMode ? 'oxide-dark' : 'oxide',
                content_css: darkMode ? 'dark' : 'default',
                plugins: 'lists link',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist',
              }}
              value={formData.content}
              onEditorChange={c => setFormData({ ...formData, content: c })}
            />
            <button className="btn-gradient" style={{ marginTop: '8px', width: '100%' }} onClick={handlePublish}>
              Publish Changes
            </button>
          </div>
        </div>
      )}

      <footer>
        <p>© 2026 Creative Agency. Built with React & Node.</p>
      </footer>
    </div>
  );
}

export default App;