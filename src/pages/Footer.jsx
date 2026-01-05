import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import "../styles/footer.css";

export default function Footer() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const social = [
    { icon: <FaFacebookF />, url: "https://facebook.com/" },
    { icon: <FaGithub />, url: "https://github.com/yourusername" },
    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/" },
    { icon: <FaYoutube />, url: "https://www.youtube.com/" },
  ];

  return (
    <footer className="site-footer" data-aos="fade-up">
      <div className="footer-top">
        <h2 className="footer-brand">Kirti Gatyani</h2>
      </div>

      <div className="footer-middle" data-aos="zoom-in" data-aos-delay="300">
        <div className="socials" aria-label="Social links">
          {social.map((s, i) => (
            <a
              key={i}
              className="social-link"
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${s.url}`}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom" data-aos="fade-up" data-aos-delay="500">
        <small>
          © {new Date().getFullYear()} Kirti Gatyani. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
