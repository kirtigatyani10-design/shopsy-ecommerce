
import React, { useEffect, useState } from "react";
import NavbarComponent from "./navbarcomponents/Navbar"; 
import { Button } from "react-bootstrap";
import bannerphoto from "./assets/Bannerphoto.jpg";  
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import "./styles/global.css";
import "./styles/banner.css";
import "./styles/navbar.css";
import "./styles/about.css";
import "./styles/skills.css";
import "./styles/projects.css";
import "./styles/resume.css";
import "./styles/contact.css";
import "./styles/footer.css";

export default function App() {
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "resume", "contact"];
      let current = "home";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        // If page scrolled past section top minus offset then mark it current
        if (window.scrollY >= el.offsetTop - 160) {
          current = id;
        }
      });

      setActiveLink(current);

      // Optional: toggle navbar-scrolled class if you still want the small shadow on scroll
      const nav = document.querySelector(".navbar-custom");
      if (nav) {
        if (window.scrollY > 30) nav.classList.add("navbar-scrolled");
        else nav.classList.remove("navbar-scrolled");
      }
    };

    // init + attach
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.offsetTop - 72, // navbar height offset to avoid hiding top of section
      behavior: "smooth",
    });
    setActiveLink(id);
  };

  return (
    <>
      {/* Navbar (pass props) */}
      <NavbarComponent activeLink={activeLink} handleNavClick={handleNavClick} />

      {/* Hero / Banner */}
      <header id="home" className="hero-section">
        <div className="hero-left">
          <div className="hero-content container-lg">
            <p className="intro text-uppercase">Hello! This is <span className="highlight-name">Kirti</span></p>
            <h1 className="hero-title">
              Creative <span className="accent">UI/UX</span><br />
              Designer &amp; Developer
            </h1>

            <div className="hero-cta">
              <Button className="btn-hire" onClick={(e) => handleNavClick(e, "contact")}>Hire me</Button>
              <Button className="btn-cv" onClick={() => { /* optional download logic */ }}>Download CV</Button>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img src={bannerphoto} alt="Kirti" className="hero-img" />
        </div>
      </header>

      {/* Main sections — ensure IDs match nav items */}
      <main>
        <section id="about" className="py-4 container">
          <About />
        </section>

        <section id="skills" className="py-4 container">
          <Skills/>
        </section>

        <section id="projects" className="py-4 container">
          <Projects />
        </section>

        <section id="resume" className="py-4 container">
          <Resume />
        </section>

        <section id="contact" className="py-4 container">
          <Contact />
        </section>

        <section id="footer" className="py-4">
          <Footer />
        </section>
      </main>
    </>
  );
}
