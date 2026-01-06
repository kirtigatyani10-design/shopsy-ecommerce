import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import AOS from "aos";
import "aos/dist/aos.css";
import bannerphoto from "../assets/Bannerphoto.jpg";
import "../styles/about.css";

export default function About() {
  const typedRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const options = {
      strings: ["I'm Developer", "I'm Fullstack Developer", "I'm UI/UX Developer"],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: false
    };
    const typed = new Typed(typedRef.current, options);
    return () => typed.destroy();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        <div className="about-left" aria-hidden="true" data-aos="fade-right">
          <img src={bannerphoto} alt="Kirti Gatyani" className="about-img" />
        </div>

        <div className="about-right" data-aos="fade-left" data-aos-delay="120">
          <p className="about-intro">MY INTRO</p>
          <h2 className="about-title">About Me</h2>

          <p className="typed-line" ref={typedRef} style={{ minHeight: 40 }} />

          <p className="about-description" data-aos="fade-up" data-aos-delay="220">
            Hi, I am <strong>Kirti Gatyani</strong>.
            I am a <strong>Fullstack Developer</strong> with Enthusiastic and detail-oriented Frontend Developer 
            passionate about creating responsive, user-friendly websites. Skilled in HTML, CSS, and JavaScript, 
            with hands-on experience building interactive interfaces using React. Eager to apply my knowledge in real-world
            projects and continue learning modern web technologies.
          </p>

          <div className="about-details" data-aos="fade-up" data-aos-delay="320">
            <p><strong>Name:</strong> Kirti Gatyani</p>
            <p><strong>Address:</strong> D-1 Pathik Nagar Bhilwara(Raj)</p>
            <p><strong>Phone:</strong> +91 7638907567</p>
            <p><strong>Degree:</strong> Bachelor of Commerce</p>
            <p><strong>Date of Birth:</strong> January 01,2003</p>
            <p><strong>Email:</strong> kirtigatyani110@gmail.com</p>
          </div>

          <div className="about-tags" aria-hidden="true" data-aos="fade-up" data-aos-delay="420">
            <span className="tag">🎵 Music</span>
            <span className="tag">✈️ Travel</span>
            <span className="tag">🏸 Badminton</span>
            <span className="tag">🎬 Movies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
