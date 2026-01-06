import React, {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/resume.css";

export default function Resume() {
  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  return (
    <section id="resume" className="resume-section">
      <div className="container resume-container">
        <header className="resume-header" data-aos="fade-up">
          <h5 className="subtitle">Resume</h5>
          <h2 className="title">My Resume</h2>
          <p className="lead">
            Short overview of experience and education — simple and to the point.
          </p>
        </header>

        <div className="resume-top">
          <div className="resume-summary-card" data-aos="fade-right">
            <h3 className="name">Kirti Gatyani</h3>
            <p className="role">Frontend Developer (Fresher)</p>

            <p className="summary">
              Enthusiastic and detail-oriented Frontend Developer passionate about creating
              responsive, user-friendly websites. Skilled in HTML, CSS, and JavaScript, with
              hands-on experience building interactive interfaces using React. Eager to apply
              knowledge in real-world projects and continue learning modern web technologies.
            </p>
          </div>
        </div>

        {/* Timeline: Education & Experience */}
        <div className="timeline-wrapper" data-aos="fade-up">
          <div className="timeline-line" />
          <div className="timeline-entries">
            {/* Education entry (left) */}
            <article className="timeline-entry left" data-aos="fade-right" data-aos-delay="80">
              <div className="card">
                <h4 className="entry-title">Bachelor of Commerce</h4>
                <div className="muted">MLV Govt College, Bhilwara — 2021 - 2024</div>
                <p className="entry-desc">
                  Completed Bachelor of Commerce. Coursework included business basics and
                  commerce fundamentals. 
                </p>
              </div>
            </article>

            {/* Experience entry (right) */}
            <article className="timeline-entry right" data-aos="fade-left" data-aos-delay="160">
              <div className="card">
                <h4 className="entry-title">Frontend Developer (Intern / Projects)</h4>
                <div className="muted">2024 – Present (Self-learning & Freelance)</div>
                <p className="entry-desc">
                  Developed multiple responsive web pages using HTML, CSS, and JavaScript.
                  Currently building interactive UI components in React using hooks and
                  reusable components. Exploring API integration, routing, and state management.
                </p>
              </div>
            </article>

            {/* Optional additional short card */}
            <article className="timeline-entry left" data-aos="fade-right" data-aos-delay="240">
              <div className="card">
                <h4 className="entry-title">Personal Projects</h4>
                <div className="muted">2023 – Present</div>
                <p className="entry-desc">
                  Built small tools and prototypes (camera demo, registration form, catering demo)
                  using HTML/CSS and progressively integrating React + Material UI.
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* Download CV / contact CTA */}
        <div className="resume-cta" data-aos="fade-up" data-aos-delay="320">
          <a href="/resume.pdf" className="btn btn-primary" target="_blank" rel="noreferrer">
            Download CV
          </a>
          <a href="#contact" className="btn btn-outline">
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
