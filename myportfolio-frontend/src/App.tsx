import { useEffect, useState } from "react";
import AOS from "aos";
import { skills } from "./data/skills";
import { ContactSection } from "./components/ContactSection";

export function App() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  //collapsible navigation bar from aos library
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#home" data-aos="fade-right" data-aos-duration="2000">
            KSTomaneng<span>.</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${navOpen ? "show" : ""}`} id="mainNav" data-aos="fade-down" data-aos-duration="2000">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li className="nav-item"><a className="nav-link" href="#about" onClick={() => setNavOpen(false)}>About Me</a></li>
              <li className="nav-item"><a className="nav-link" href="#skills" onClick={() => setNavOpen(false)}>Skills</a></li>
              <li className="nav-item"><a className="nav-link" href="#experience" onClick={() => setNavOpen(false)}>Experience</a></li>
              <li className="nav-item"><a className="nav-link" href="#education" onClick={() => setNavOpen(false)}>Education</a></li>
              <li className="nav-item"><a className="nav-link nav-contact" href="#contact" onClick={() => setNavOpen(false)}>Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-section" id="home">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7" data-aos="flip-up" data-aos-duration="2000">
                <h1>
                  Hi, I&apos;m <span>Kristian Samuel<br className="d-none d-md-block" /> Tomaneng.</span>
                </h1>
                <h2 className="hero-role">Programmer/Developer</h2>
                <p className="hero-copy">
                  I enjoy learning new technologies, solving problems, and creating useful digital experiences.
                </p>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <a className="btn btn-primary-custom" href="#contact">Hire Me <span aria-hidden="true">↗</span></a>
                  <a className="btn btn-outline-custom" href="/assets/Kristian Samuel Tomaneng.pdf" download>MY CV</a>
                </div>
              </div>

              <div className="col-lg-5 text-center text-lg-end mt-4 mt-lg-0" data-aos="fade-left" data-aos-duration="2000">
                <img src="/assets/2.jpg" alt="Kristian Samuel Tomaneng" className="hero-photo img-fluid rounded-5" />
              </div>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container" data-aos="fade-up-left" data-aos-duration="2000">
            <div className="row align-items-center gy-4">
              <div className="col-lg-4">
                <div className="about-art">
                  <img src="/assets/1.jpg" alt="Kristian Samuel Tomaneng" className="about-photo" />
                </div>
              </div>
              <div className="col-lg-7 offset-lg-1">
                <h3>Hey there! Glad you&apos;re here.</h3>
                <p>
                  I&apos;m Kristian Samuel Tomaneng. I&apos;m currently looking for an entry-level programming job and have basic knowledge of HTML, CSS, and JavaScript, along with experience and familiarity with Git, Java, SQL, Selenium, and other multimedia applications.
                </p>
                <p>
                  I like innovation in technology and learning new things. When I&apos;m not programming, I usually spend my time on hydroponics, playing games, and eating.
                </p>
                <div className="about-facts">
                  <div><strong>10+</strong><span>Tools &amp; skills</span></div>
                  <div><strong>Always</strong><span>Learning something new</span></div>
                  <div><strong>Open</strong><span>To opportunities</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="container" data-aos="fade-right" data-aos-duration="2000">
            <div className="section-heading text-center">
              <h2>My <span>Skills</span></h2>
              <p className="section-subtitle">A mix of programming, testing, and creative tools I&apos;m familiar with.</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div className="skill-card" key={skill.name}>
                  <span className="skill-icon">
                    <a href={skill.url} target="_blank" rel="noopener noreferrer">
                      <img src={skill.icon} alt={skill.name} width={40} height={40} />
                    </a>
                  </span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="container" data-aos="zoom-in-up" data-aos-duration="2000">
            <div className="section-heading">
              <h2>Work <span>Experience</span></h2>
            </div>
            <div className="timeline">
              <article className="timeline-item">
                <div className="timeline-date">2018 — 2024</div>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Data Encoder / Administrative Aide</h3>
                  <h4>LGU Sto. Niño</h4>
                  <p>
                    Encoded data and handled administrative work, including preparing vouchers, assisting clients and coworkers, and troubleshooting computers.
                  </p>
                </div>
              </article>
              <article className="timeline-item">
                <div className="timeline-date">2015 — 2017</div>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>Freelance Photographer / Videographer</h3>
                  <p>Freelance photography and videography experience.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section education-section" id="education">
          <div className="container" data-aos="flip-up" data-aos-duration="2000">
            <div className="section-heading text-center">
              <h2>Edu<span>cation</span></h2>
            </div>
            <div className="row g-4 education-row">
              <div className="col-lg-6">
                <article className="education-card">
                  <div className="education-year">2011 — 2015</div>
                  <div>
                    <span className="education-label">BACHELOR&apos;S DEGREE</span>
                    <h3>Information Technology</h3>
                    <p>Major in Animation</p>
                    <p className="school-name">Cagayan State University, Carig Campus</p>
                  </div>
                </article>
              </div>
              <div className="col-lg-6">
                <article className="education-card">
                  <div className="education-year">2007 — 2010</div>
                  <div>
                    <span className="education-label">SECONDARY SCHOOL</span>
                    <h3>High School</h3>
                    <p className="school-name">Santo Niño National High School<br />Santo Niño, Cagayan</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <footer className="site-footer">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p>© KSTomaneng All rights reserved</p>
          <div>
            <a href="#home" className="back-top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;