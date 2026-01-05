import React, {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/skills.css";

const frontendSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React JS",
  "Redux",
  "Bootstrap",
  "Material UI",
];

const languageSkills = ["JavaScript"];
const toolSkills = ["GitHub", "VS Code"];

const proficiencyCards = [
  { name: "HTML", pct: 98 },
  { name: "CSS", pct: 95 },
  { name: "JavaScript", pct: 90 },
  { name: "React JS", pct: 88 },
  { name: "Redux", pct: 82 },
  { name: "Bootstrap", pct: 85 },
];

export default function Skills() {
  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  return (
    <section id="skills" className="skills-section" data-aos="fade-up">
      <div className="container" data-aos="fade-up">
        <div className="skills-header">
          <h5 className="subtitle">SKILLS</h5>
          <h2 className="title">My Skills</h2>
          <p className="description">
            A snapshot of my technical toolkit and the technologies I enjoy using
            to build digital experiences.
          </p>
        </div>

        {/* Category Section */}
        <div className="category-grid">
          <div className="category-card light-card" data-aos="fade-right">
            <h3>Frontend</h3>
            <div className="pills">
              {frontendSkills.map((s) => (
                <span className="pill" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="category-card light-card" data-aos="fade-up" data-aos-delay="80">
            <h3>Languages</h3>
            <div className="pills">
              {languageSkills.map((s) => (
                <span className="pill" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="category-card light-card" data-aos="fade-left" data-aos-delay="160">
            <h3>Tools</h3>
            <div className="pills">
              {toolSkills.map((s) => (
                <span className="pill" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Proficiency Section */}
        <div className="proficiency-grid">
          {proficiencyCards.map((c, i) => (
            <div key={c.name} className="prof-card" data-aos="zoom-in" data-aos-delay={i * 80}>
              <div className="circle-wrap">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    className="circle-bg"
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    strokeDasharray={`${c.pct}, 100`}
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">
                    {c.pct}%
                  </text>
                </svg>
              </div>
              <h4>{c.name}</h4>
              <p className="meta">Improved steadily this month 🚀</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
