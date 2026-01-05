import React, {useEffect} from "react";
import { FiSearch, FiExternalLink } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/projects.css";
import beautyPhoto from "../assets/beautyphoto.avif";
import cameraphoto from "../assets/cameraphoto.avif";
import foodphoto from "../assets/foodphoto.avif";
import gymphoto from "../assets/gymphoto.avif";

const projects = [
  {
    title: "Camera Project",
    category: "Photography App",
    description:
      "A lightweight camera app with real-time filters and UI controls. Built with plain HTML/CSS and enhanced as a demo app.",
    image: cameraphoto,
    url: "http://127.0.0.1:5501/camera.html#",
  },
  {
    title: "Gym Registration",
    category: "Registration Form",
    description:
      "An HTML/CSS registration form for gym membership — users can sign up and submit their details. Simple, responsive and easy to integrate.",
    image: gymphoto,
    url: "https://example.com/gym-registration",
  },
  {
    title: "Food & Catering",
    category: "Food Ordering",
    description:
      "Catering & food-ordering prototype built with HTML/CSS — shows menus, pricing and a simple ordering flow for clients.",
    image: foodphoto,
    url: "https://example.com/food-catering",
  },
  {
    title: "Beauty Studio Website",
    category: "Multi-page Website",
    description:
      "A full multi-page beauty website (gallery, pricing, services, contact). Built with structured pages, images and pricing details.",
    image: beautyPhoto,
    url: "https://example.com/beauty-site",
  },
];

export default function Projects() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // open an URL (project) in a new tab
  const openProjectUrl = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");   // noopener means naye tab ko purane tab ki js access karne se rokta h(security reason)
                                                        // noreferrer means naye page ko yeh nahi batata h ki user kis site se aaya h 
  };

  // open image in a new tab (preview)
  const openImage = (img) => {
    if (!img) return;
    window.open(img, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="projects" className="projects-section" data-aos="fade-up">
      <div className="container" data-aos="fade-up">
        <div className="projects-header" data-aos="fade-up">
          <h5 className="subtitle">ACCOMPLISHMENTS</h5>
          <h2 className="title">Our Projects</h2>
          <p className="description">
            A selection of recent work — click the preview or visit the project page.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div className="project-wrapper" key={idx} data-aos="zoom-in" data-aos-delay={idx * 80}>
              <div className="project-card" role="button" tabIndex={0}>
                <img src={project.image} alt={project.title} className="project-image" />

                {/* overlay with icons (shown on hover) */}
                <div className="project-overlay" aria-hidden="true">
                  <button
                    className="overlay-icon"
                    title="Preview image"
                    onClick={(e) => {
                      e.stopPropagation();
                      openImage(project.image);
                    }}
                  >
                    <FiSearch size={20} />
                  </button>

                  <button
                    className="overlay-icon"
                    title="Open project"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProjectUrl(project.url);
                    }}
                  >
                    <FiExternalLink size={20} />
                  </button>
                </div>
              </div>

              {/* details below image (2-3 lines) */}
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-category">{project.category}</p>
                <p className="project-desc">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
