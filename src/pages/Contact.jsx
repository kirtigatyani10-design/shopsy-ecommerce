import React, { useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import emailjs from "emailjs-com";
import "../styles/contact.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

export default function Contact() {
  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID", 
        "YOUR_TEMPLATE_ID", 
        form.current,
        "YOUR_PUBLIC_KEY" 
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section id="contact" className="contact-section" data-aos="fade-up">
      <div className="contact-container" data-aos="fade-up">
        <header className="contact-header" data-aos="fade-up">
          <h5 className="subtitle">Contact Us</h5>
          <h2 className="title">Have a Project?</h2>
          <p className="lead">
            Let’s talk! Fill out the form below and I’ll get back to you soon.
          </p>
        </header>

        <div className="contact-content">
          {/* Contact Form */}
          <form ref={form} onSubmit={sendEmail} className="contact-form" data-aos="fade-right">
            <div className="row">
              <input type="text" name="from_name" placeholder="Your Name" required />
              <input type="email" name="from_email" placeholder="Your Email" required />
            </div>

            <input type="text" name="subject" placeholder="Subject" required />
            <textarea name="message" rows="5" placeholder="Message" required />

            <button type="submit" className="btn btn-send">
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="contact-info" data-aos="fade-left">
            <div className="info-item">
              <FaMapMarkerAlt className="icon" />
              <div>
                <h4>Address:</h4>
                <p> D-1 , Pathik nagar Bhilwara(Raj)</p>
              </div>
            </div>

            <div className="info-item">
              <FaPhoneAlt className="icon" />
              <div>
                <h4>Phone:</h4>
                <p>+91 9876543210</p>
              </div>
            </div>

            <div className="info-item">
              <FaEnvelope className="icon" />
              <div>
                <h4>Email:</h4>
                <p>kirtigatyani110@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <FaGlobe className="icon" />
              <div>
                <h4>Website:</h4>
                <p>yourportfolio.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
